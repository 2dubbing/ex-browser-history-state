import { useContext } from "react";
import { LayoutContext } from "./Layout";

export const useLayout = () => useContext(LayoutContext);
