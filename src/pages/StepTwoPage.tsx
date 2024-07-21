import React, { useRef } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";

export default function StepTwoPage() {
  const { getStepCondition } = useStepPageController();
  const stepCondition = useRef(getStepCondition(2)).current;

  return (
    <React.Fragment>
      <h2>2단계 페이지</h2>
    </React.Fragment>
  );
}
