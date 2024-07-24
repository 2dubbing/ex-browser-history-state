import { useContext } from "react";
import { StepDataStoreContext } from "./StepDataStore";

export const useStepDataStore = () => useContext(StepDataStoreContext);
