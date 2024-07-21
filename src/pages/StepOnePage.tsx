import React, { useRef } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";

export default function StepOnePage() {
  const { getStepCondition } = useStepPageController();
  const stepCondition = useRef(getStepCondition(1)).current;

  return (
    <React.Fragment>
      <h2>1단계 페이지</h2>
    </React.Fragment>
  );
}
