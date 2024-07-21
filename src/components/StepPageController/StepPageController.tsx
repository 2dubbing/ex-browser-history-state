// import stepStatusJSON from "../../step-status.json";
import { createContext, PropsWithChildren, useState } from "react";
import { StepType } from "../../types";
import { PAGE_DATA } from "../../constant";

// const stepStatusData = stepStatusJSON;

type ContextValueType = {
  currentStep: StepType;
  changeStep: (step: StepType) => void;
  getStepCondition: <S extends StepType>(step: S) => (typeof PAGE_DATA)[S];
  submitStepStatus: (step: StepType, status: boolean) => Promise<void>;
};

export const StepPageControllerContext = createContext<ContextValueType>(null!);

export default function StepPageController({ children }: PropsWithChildren) {
  const [currentStep, setStep] = useState<StepType>(0);
  // const [stepStatus, setStepStatus] = useState(() =>
  //   Object.entries(stepStatusData).map(([step, status]) => ({
  //     step: Number(step) as StepType,
  //     status,
  //   }))
  // );

  const changeStep = (step: StepType) => {
    setStep(step);
  };

  const getStepCondition = <S extends StepType>(step: S) => {
    return PAGE_DATA[step];
  };

  const submitStepStatus = async (step: StepType, status: boolean) => {
    // TODO: https://dexie.org/docs/Tutorial/React(indexedDB) 저장 후 setState
  };

  const provideValue = {
    currentStep,
    changeStep,
    getStepCondition,
    submitStepStatus,
  };

  return (
    <StepPageControllerContext.Provider value={provideValue}>
      {children}
    </StepPageControllerContext.Provider>
  );
}
