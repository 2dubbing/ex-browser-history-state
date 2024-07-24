import React from "react";
import StepUI from "../components/StepUI";
import { useParams } from "react-router-dom";
import { StepType } from "../types";

export default function StepPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <React.Fragment>
      <h2>{id}단계 페이지</h2>
      <StepUI step={Number(id) as StepType} />
    </React.Fragment>
  );
}
