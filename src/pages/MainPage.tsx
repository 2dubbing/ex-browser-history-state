import React, { useRef } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";

export default function MainPage() {
  const { steps, getStepCondition } = useStepPageController();
  const stepCondition = useRef(getStepCondition(0)).current;

  console.log("메인페이지 step 이동 조건: ", stepCondition);
  console.log("steps: ", steps);

  return (
    <React.Fragment>
      <h2>메인 페이지</h2>
    </React.Fragment>
  );
}
