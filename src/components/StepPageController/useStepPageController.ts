import { useContext } from "react";
import { StepPageControllerContext } from "./StepPageController";

export const useStepPageController = () =>
  useContext(StepPageControllerContext);
