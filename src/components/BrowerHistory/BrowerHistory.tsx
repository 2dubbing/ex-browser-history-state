import { PropsWithChildren, createContext, useEffect, useRef } from "react";
import { BrowserHistory, createBrowserHistory } from "history";

type ContextValueType = {
  /** @description 라이브러리 history 객체 */
  history: BrowserHistory;
  /** @description window.history 객체 */
  windowHistory: Window["history"];
};

export const BrowerHistoryContext = createContext<ContextValueType>(null!);

export default function BrowerHistory({ children }: PropsWithChildren) {
  const windowHistoryRef = useRef(window.history);
  const historyRef = useRef(createBrowserHistory());

  // history 이벤트 구독 이펙트
  useEffect(() => {
    const history = historyRef.current;
    const unlisten = history.listen(({ location, action }) => {
      console.log("history: ", action, location.pathname, location.state);
    });
    return () => {
      unlisten();
    };
  }, []);

  const contextValue = {
    history: historyRef.current,
    windowHistory: windowHistoryRef.current,
  };

  return (
    <BrowerHistoryContext.Provider value={contextValue}>
      {children}
    </BrowerHistoryContext.Provider>
  );
}
