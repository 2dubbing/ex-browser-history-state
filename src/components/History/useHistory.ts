import { useContext } from "react";
import { HistoryContext } from "./History";

export const useHistory = () => useContext(HistoryContext);
