import { initialDB, StepsSchemaType } from "../../db";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { StepType } from "../../types";
import { PAGE_DATA } from "../../constant";
import { wrapPromiseWithSuspense } from "../../utils";

type ContextValueType = {
  steps: StepsSchemaType[];
  isCompletedStep: (step: StepType) => Promise<boolean>;
  getStepCondition: <S extends StepType>(step: S) => (typeof PAGE_DATA)[S];
  submitStepStatus: (step: StepType, isCompleted: boolean) => Promise<boolean>;
};

const wrappedInitialDB = wrapPromiseWithSuspense(initialDB);

export const StepPageControllerContext = createContext<ContextValueType>(null!);

export default function StepPageController({ children }: PropsWithChildren) {
  const [steps, setSteps] = useState<StepsSchemaType[]>([]);
  const dbInstance = wrappedInitialDB.read();

  const getSteps = useCallback(async () => {
    const steps = await dbInstance.steps.toArray();
    return steps;
  }, [dbInstance]);

  useEffect(() => {
    getSteps().then((steps) => setSteps(steps));
  }, [dbInstance, getSteps]);

  const isCompletedStep = async (step: StepType) => {
    const res = await dbInstance.steps.get(step);
    if (!res) return false;
    return res.isCompleted ?? false;
  };

  const getStepCondition = <S extends StepType>(step: S) => {
    return PAGE_DATA[step];
  };

  const submitStepStatus = async (step: StepType, isCompleted: boolean) => {
    const res = await dbInstance.steps.update(step, { isCompleted });
    return res > 0;
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
