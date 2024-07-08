import {
  PropsWithChildren,
  createContext,
  useCallback,
  useRef,
  useState,
} from "react";
import { produce } from "immer";

type ContextValueType = {
  currentIndex: number;
  changeCurrentIndex: () => void;
  stack: string[];
  pushStack: (pathname: string) => void;
  replaceStack: (pathname: string) => void;
  /** @description 사용되지않을 pathname 을 새로운 pathname 으로 대체 */
  replaceUnusedPathnameWithNewPathname: (pathname: string) => void;
  /** @description window.history 객체 */
  windowHistory: Window["history"];
};

export const HistoryContext = createContext<ContextValueType>(null!);

export default function History({ children }: PropsWithChildren) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stack, setStack] = useState<string[]>(() => [
    window.location.pathname,
  ]);

  const windowHistoryRef = useRef(window.history);

  const changeCurrentIndex = useCallback(() => {
    if (currentIndex === 0) {
      console.error("현재 사이트에 history 범위를 벗어났습니다.");
      return;
    }
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const pushStack = useCallback(
    (pathname: string) => {
      setCurrentIndex((prevState) => prevState + 1);
      setStack(stack.concat(pathname));
    },
    [stack]
  );

  const replaceStack = useCallback(
    (pathname: string) => {
      const lastIdx = stack.length;

      setStack(
        produce(stack, (draft) => {
          draft.splice(lastIdx - 1, 1, pathname);
          return draft;
        })
      );
    },
    [stack]
  );

  /** @description 사용되지않을 pathname 을 새로운 pathname 으로 대체 */
  const replaceUnusedPathnameWithNewPathname = (pathname: string) => {
    const newStack = produce(stack, (draft) => {
      draft.splice(currentIndex + 1, 999, pathname);
      return draft;
    });

    setStack(newStack);
    setCurrentIndex(newStack.length - 1);
  };

  const contextValue = {
    currentIndex,
    changeCurrentIndex,
    stack,
    pushStack,
    replaceStack,
    replaceUnusedPathnameWithNewPathname,
    windowHistory: windowHistoryRef.current,
  };

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
}
