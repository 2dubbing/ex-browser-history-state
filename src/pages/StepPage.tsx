import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStepDataStore } from "../components/StepDataStore/useStepDataStore";
import { useStepCondition } from "../components/StepDataStore/useStepCondition";
import { StepType } from "../types";

export default function StepPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { submitStepStatus } = useStepDataStore();
  const { isCompleted, stepCondition } = useStepCondition(
    Number(id) as StepType
  );

  const handleNextStep = () => {
    const pathname =
      typeof stepCondition?.nextStep === "number"
        ? stepCondition?.nextStep > 0
          ? `/step/${stepCondition.nextStep}`
          : "/"
        : null;
    pathname && navigate(pathname);
  };

  const handlePrevStep = () => {
    const pathname =
      typeof stepCondition?.prevStep === "number"
        ? stepCondition?.prevStep > 0
          ? `/step/${stepCondition.prevStep}`
          : "/"
        : null;
    pathname && navigate(pathname, { replace: true });
  };

  return (
    <React.Fragment>
      <h2>{id}단계 페이지</h2>

      {isCompleted ? (
        <p>완료 됨</p>
      ) : (
        <React.Fragment>
          <p>완료되지 않음</p>
          <button
            onClick={() => submitStepStatus(Number(id) as StepType, true)}
          >
            완료하기
          </button>
        </React.Fragment>
      )}
      <button onClick={handleNextStep}>다음단계 진행</button>
      <button onClick={handlePrevStep}>이전단계 진행</button>
    </React.Fragment>
  );
}
