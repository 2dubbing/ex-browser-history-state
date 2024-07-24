import React from "react";
import { useStepDataStore } from "../components/StepDataStore/useStepDataStore";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const { steps, resetAllStepStatus } = useStepDataStore();

  const handleNextStep = () => {
    navigate(`/step/1`);
  };

  const isClearAllSteps = steps
    .filter((data) => data.step !== 0)
    .every((data) => data.isCompleted);

  return (
    <React.Fragment>
      <h2>메인 페이지</h2>
      <p>전체완료 여부: {isClearAllSteps ? "완료" : "미완료"}</p>
      {isClearAllSteps ? (
        <button onClick={resetAllStepStatus}>상태 리셋하기</button>
      ) : (
        <button onClick={handleNextStep}>다음단계 진행</button>
      )}
    </React.Fragment>
  );
}
