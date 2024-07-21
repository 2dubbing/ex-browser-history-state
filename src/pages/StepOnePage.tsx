import React, { Suspense } from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";
import StepUI from "./StepUI";

export default function StepOnePage() {
  const { submitStepStatus } = useStepPageController();
  // const stepCondition = useRef(getStepCondition(1)).current;

  return (
    <React.Fragment>
      <h2>1단계 페이지</h2>
      <Suspense fallback={<p>불러오는 중...</p>}>
        <StepUI step={1} submit={submitStepStatus} />
      </Suspense>
    </React.Fragment>
  );
}
