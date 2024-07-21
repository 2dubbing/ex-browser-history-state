import React from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";
import StepUI from "./StepUI";

export default function StepTwoPage() {
  const { submitStepStatus } = useStepPageController();
  // const stepCondition = useRef(getStepCondition(2)).current;

  return (
    <React.Fragment>
      <h2>2단계 페이지</h2>
      <React.Suspense fallback={<p>불러오는 중...</p>}>
        <StepUI step={2} submit={submitStepStatus} />
      </React.Suspense>
    </React.Fragment>
  );
}
