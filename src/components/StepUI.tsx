import { useStepPageStore } from "./StepPageStore/useStepPageStore";
import { StepType } from "../types";
import { useStepUI } from "../hooks/useStepUI";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";

export interface StepUIProps {
  step: StepType;
}

export default function StepUI({ step }: StepUIProps) {
  const navigate = useNavigate();
  const { submitStepStatus } = useStepPageStore();
  const { isCompleted, stepCondition } = useStepUI({ step });
  console.log(
    "step: ",
    step,
    " isCompleted: ",
    isCompleted,
    " condition: ",
    stepCondition
  );

  const handleNextStep = () => {
    const pathname =
      typeof stepCondition?.nextStep === "number"
        ? stepCondition?.nextStep > 0
          ? `/step/${stepCondition.nextStep}`
          : "/"
        : null;
    pathname && navigate(pathname);
  };

  const handlePrevStep = () => {
    const pathname =
      typeof stepCondition?.prevStep === "number"
        ? stepCondition?.prevStep > 0
          ? `/step/${stepCondition.prevStep}`
          : "/"
        : null;
    pathname && navigate(pathname, { replace: true });
  };

  return (
    <Fragment>
      {isCompleted ? (
        <p>완료 됨</p>
      ) : (
        <>
          <p>완료되지 않음</p>
          <button onClick={() => submitStepStatus(step, true)}>완료하기</button>
        </>
      )}
      <button onClick={handleNextStep}>다음단계 진행</button>
      <button onClick={handlePrevStep}>이전단계 진행</button>
    </Fragment>
  );
}
