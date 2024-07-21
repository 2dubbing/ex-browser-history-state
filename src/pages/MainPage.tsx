import React, { useRef } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";

export default function MainPage() {
  const { getStepCondition } = useStepPageController();
  const stepCondition = useRef(getStepCondition(0)).current;

  return (
    <React.Fragment>
      <h2>메인 페이지</h2>
    </React.Fragment>
  );
}
