import { useEffect, useState } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";
import { StepType } from "../types";

interface StepUIProps {
  step: StepType;
  submit: (step: StepType, isCompleted: boolean) => void;
}

export default function StepUI({ step, submit }: StepUIProps) {
  const { isCompletedStep } = useStepPageController();
  const [isCompleted, setComplete] = useState(false);

  useEffect(() => {
    isCompletedStep(step).then((isCompleted) => {
      setComplete(isCompleted);
    });
  }, [isCompletedStep, step]);

  return isCompleted ? (
    <p>완료 됨</p>
  ) : (
    <>
      <p>완료되지 않음</p>
      <button onClick={() => submit(step, true)}>완료하기</button>
    </>
  );
}
