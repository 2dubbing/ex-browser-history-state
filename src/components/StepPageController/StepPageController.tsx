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

type ContextValueType = {
  steps: StepsSchemaType[];
  isCompletedStep: (step: StepType) => Promise<boolean>;
  getStepCondition: <S extends StepType, C extends "true" | "false">(
    step: S,
    isCompleted: C
  ) => StepCondition[C];
  submitStepStatus: (step: StepType, isCompleted: boolean) => void;
};

const wrappedInitialDB = wrapPromiseWithSuspense(initialDB);

export const StepPageControllerContext = createContext<ContextValueType>(null!);

export default function StepPageController({ children }: PropsWithChildren) {
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

  const provideValue = {
    steps,
    isCompletedStep,
    getStepCondition,
    submitStepStatus,
  };

  return (
    <StepPageControllerContext.Provider value={provideValue}>
      {children}
    </StepPageControllerContext.Provider>
  );
}
