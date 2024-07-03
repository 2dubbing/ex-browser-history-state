import { PropsWithChildren, createContext, useRef } from "react";
import {
  BrowserHistory,
  MemoryHistory,
  createBrowserHistory,
  createMemoryHistory,
} from "history";

type ContextValueType = {
  /** @description window.history 객체 */
  windowHistory: Window["history"];
  /** @description 라이브러리 BrowserHistory 객체 */
  browserHistory: BrowserHistory;
  /** @description 라이브러리 MemoryHistory 객체 */
  memoryHistory: MemoryHistory;
};

export const HistoryContext = createContext<ContextValueType>(null!);

export default function History({ children }: PropsWithChildren) {
  const windowHistoryRef = useRef(window.history);
  const browserHistoryRef = useRef(createBrowserHistory());
  const memoryHistoryRef = useRef(createMemoryHistory());

  const contextValue = {
    windowHistory: windowHistoryRef.current,
    browserHistory: browserHistoryRef.current,
    memoryHistory: memoryHistoryRef.current,
  };

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
}
