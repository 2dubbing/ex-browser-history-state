import { initialDB, DexieSchema } from "../../db";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { StepType } from "../../types";
import { PAGE_DATA } from "../../constant";

type ContextValueType = {
  isCompletedStep: (step: StepType) => Promise<boolean>;
  getStepCondition: <S extends StepType>(step: S) => (typeof PAGE_DATA)[S];
  submitStepStatus: (step: StepType, isCompleted: boolean) => Promise<boolean>;
};

export const StepPageControllerContext = createContext<ContextValueType>(null!);

export default function StepPageController({ children }: PropsWithChildren) {
  const [db, setDB] = useState<DexieSchema>();

  useEffect(() => {
    initialDB.then((db) => setDB(db));
  }, []);

  const isCompletedStep = async (step: StepType) => {
    if (!db) return false;
    const res = await db.steps.get(step);
    if (!res) return false;
    return res.isCompleted ?? false;
  };

  const getStepCondition = <S extends StepType>(step: S) => {
    return PAGE_DATA[step];
  };

  const submitStepStatus = async (step: StepType, isCompleted: boolean) => {
    if (!db) return false;
    const res = await db.steps.update(step, { isCompleted });
    return res > 0;
  };

  const provideValue = {
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
