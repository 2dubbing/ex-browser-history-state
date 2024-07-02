import { useContext } from "react";
import { RouterContext } from "./Router";

export const useRouter = () => useContext(RouterContext);
