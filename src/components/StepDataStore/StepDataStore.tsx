import { initialDB, StepsSchemaType } from "../../db";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { StepCondition, StepType } from "../../types";
import { PAGE_DATA } from "../../constant";
import { wrapPromiseWithSuspense } from "../../utils";
import useInitialHistoryPush from "./useInitialHistoryPush";

type ContextValueType = {
  steps: StepsSchemaType[];
  isCompletedStep: (step: StepType) => Promise<boolean>;
  getStepCondition: <S extends StepType, C extends "true" | "false">(
    step: S,
    isCompleted: C
  ) => StepCondition[C];
  submitStepStatus: (step: StepType, isCompleted: boolean) => void;
  resetAllStepStatus: () => void;
};

const wrappedInitialDB = wrapPromiseWithSuspense(initialDB);

export const StepDataStoreContext = createContext<ContextValueType>(null!);

export default function StepDataStore({ children }: PropsWithChildren) {
  useInitialHistoryPush();

  const [steps, setSteps] = useState<StepsSchemaType[]>([]);
  const dbInstance = wrappedInitialDB.read();

  const reloadSteps = useCallback(async () => {
    const steps = await dbInstance.steps.toArray();
    setSteps(steps);
  }, [dbInstance]);
  useEffect(() => {
    reloadSteps();
  }, [reloadSteps]);

  const isCompletedStep = async (step: StepType) => {
    const res = await dbInstance.steps.get(step);
    if (!res) return false;
    return res.isCompleted ?? false;
  };

  const getStepCondition = useCallback(
    <S extends StepType, C extends "true" | "false">(
      step: S,
      isCompleted: C
    ) => {
      return PAGE_DATA[step].isCompleted[isCompleted];
    },
    []
  );

  const submitStepStatus = async (step: StepType, isCompleted: boolean) => {
    const updatedRows = await dbInstance.steps.update(step, { isCompleted });
    console.log("updatedRows: ", updatedRows);
    await reloadSteps();
  };

  const resetAllStepStatus = async () => {
    const updatedRows = await dbInstance.steps.bulkUpdate([
      {
        key: 1,
        changes: { isCompleted: false },
      },
      {
        key: 2,
        changes: { isCompleted: false },
      },
      {
        key: 3,
        changes: { isCompleted: false },
      },
    ]);
    console.log("updatedRows: ", updatedRows);
    await reloadSteps();
  };

  const provideValue = {
    steps,
    isCompletedStep,
    getStepCondition,
    submitStepStatus,
    resetAllStepStatus,
  };

  return (
    <StepDataStoreContext.Provider value={provideValue}>
      {children}
    </StepDataStoreContext.Provider>
  );
}
