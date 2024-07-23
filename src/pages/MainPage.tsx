import React from "react";
import { useStepPageController } from "../components/StepPageController/useStepPageController";
import { useStepUI } from "../hooks/useStepUI";
import { useRouter } from "../components/SimpleRouter";

export default function MainPage() {
  const { navigate } = useRouter();
  const { steps } = useStepPageController();
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
