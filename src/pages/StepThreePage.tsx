import React from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";
import StepUI from "./StepUI";

export default function StepThreePage() {
  const { submitStepStatus } = useStepPageController();
  // const stepCondition = useRef(getStepCondition(3)).current;

  return (
    <React.Fragment>
      <h2>3단계 페이지</h2>
      <React.Suspense fallback={<p>불러오는 중...</p>}>
        <StepUI step={3} submit={submitStepStatus} />
      </React.Suspense>
    </React.Fragment>
  );
}
