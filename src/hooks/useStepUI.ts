import { useEffect, useState } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";
import { StepUIProps } from "../components/StepUI";

export const useStepUI = ({ step }: StepUIProps) => {
  const { steps, getStepCondition } = useStepPageController();
  const [isCompleted, setComplete] = useState(false);
  const [stepCondition, setStepCondition] = useState<null | ReturnType<
    typeof getStepCondition
  >>(null);

  useEffect(() => {
    const isCompleted = steps?.[step]?.isCompleted;
    const key = isCompleted ? "true" : "false";
    const condition = getStepCondition(step, key);

    setStepCondition(condition);
    setComplete(isCompleted);
  }, [getStepCondition, step, steps]);

  return { isCompleted, stepCondition };
};
