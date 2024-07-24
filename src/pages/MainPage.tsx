import React from "react";
import { useStepPageStore } from "../components/StepPageStore/useStepPageStore";
import { useStepUI } from "../hooks/useStepUI";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const { steps } = useStepPageStore();
  const { isCompleted, stepCondition } = useStepUI({ step: 0 });

  const handleNextStep = () => {
    const pathname =
      typeof stepCondition?.nextStep === "number"
        ? stepCondition?.nextStep > 0
          ? `/step/${stepCondition.nextStep}`
          : "/"
        : null;
    pathname && navigate(pathname);
  };

  console.log("steps: ", steps);
  console.log(
    "step: ",
    0,
    " isCompleted: ",
    isCompleted,
    " stepCondition: ",
    stepCondition
  );

  return (
    <React.Fragment>
      <h2>메인 페이지</h2>
      <ul>
        {steps.map((data) => (
          <li key={data.step}>
            {data.step}단계 {data.isCompleted ? "완료" : "미완료"} 상태
          </li>
        ))}
      </ul>
      <button onClick={handleNextStep}>다음단계 진행</button>
    </React.Fragment>
  );
}
