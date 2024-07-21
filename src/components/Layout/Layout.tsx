import {
  createContext,
  PropsWithChildren,
  Suspense,
  useCallback,
  useState,
} from "react";
import HistoryStackUI from "../HistoryStackUI";
import OptionBar from "./OptionBar";
import NavigationBar from "./NavigationBar";
import { HISTORY_STATE_TYPE } from "../../constant";
import { NavigateType } from "../../types";
import StepPageController from "../StepPageController/StepPageController";

type ContextValueType = {
  /** PUSH -> pushState / REPLACE -> replaceState */
  historyStateType: NavigateType;
  changeHistoryStateType: (type: NavigateType) => void;
};

export const LayoutContext = createContext<ContextValueType>(null!);

export default function Layout({ children }: PropsWithChildren) {
  const [historyStateType, setHistoryStateType] = useState<NavigateType>(
    HISTORY_STATE_TYPE["PUSH"]
  );

  const changeHistoryStateType = useCallback((type: NavigateType) => {
    setHistoryStateType(type);
  }, []);

  const value = { historyStateType, changeHistoryStateType };

  return (
    <LayoutContext.Provider value={value}>
      <header>
        <OptionBar />
        <NavigationBar />
      </header>
      <article className="main-container">
        <section className="page-wrapper">
          <Suspense fallback={<div>....</div>}>
            <StepPageController>{children}</StepPageController>
          </Suspense>
        </section>
        <section className="history-stack-wrapper">
          <HistoryStackUI />
        </section>
      </article>
      <footer></footer>
    </LayoutContext.Provider>
  );
}
