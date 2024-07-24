import { useContext } from "react";
import { StepPageStoreContext } from "./StepPageStore";

export const useStepPageStore = () => useContext(StepPageStoreContext);
