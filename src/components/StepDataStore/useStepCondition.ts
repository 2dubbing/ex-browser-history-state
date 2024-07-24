import { useEffect, useState } from "react";
import { useStepDataStore } from "./useStepDataStore";
import { StepType } from "../../types";

export const useStepCondition = (step: StepType) => {
  const { steps, getStepCondition } = useStepDataStore();
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
