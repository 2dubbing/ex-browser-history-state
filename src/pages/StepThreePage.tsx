import React, { useRef } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";

export default function StepThreePage() {
  const { getStepCondition } = useStepPageController();
  const stepCondition = useRef(getStepCondition(3)).current;

  return (
    <React.Fragment>
      <h2>3단계 페이지</h2>
    </React.Fragment>
  );
}
