import { useContext } from "react";
import { BrowerHistoryContext } from "./BrowerHistory";

export const useHistory = () => useContext(BrowerHistoryContext);
