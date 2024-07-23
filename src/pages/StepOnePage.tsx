import React from "react";
import StepUI from "../components/StepUI";

export default function StepOnePage() {
  return (
    <React.Fragment>
      <h2>1단계 페이지</h2>
      <StepUI step={1} />
    </React.Fragment>
  );
}
