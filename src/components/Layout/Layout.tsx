import { createContext, PropsWithChildren, useCallback, useState } from "react";
import HistoryStackUI from "../HistoryStackUI";
import OptionBar from "./OptionBar";
import NavigationBar from "./NavigationBar";
import { HISTORY_STATE_TYPE } from "../../constant";
import { NavigateType } from "../SimpleRouter/type";

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
        <section className="page-wrapper">{children}</section>
        <section className="history-stack-wrapper">
          <HistoryStackUI />
        </section>
      </article>
      <footer></footer>
    </LayoutContext.Provider>
  );
}
