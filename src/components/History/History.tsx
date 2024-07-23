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
  changeCurrentIndex: (settingIndex?: number) => void;
  stack: string[];
  pushStack: (pathname: string) => void;
  replaceStack: (pathname: string) => void;
  /** @description window.history 객체 */
  windowHistory: Window["history"];
};

export const HistoryContext = createContext<ContextValueType>(null!);

export default function History({ children }: PropsWithChildren) {
  const [stack, setStack] = useState<string[]>([window.location.pathname]);
  const [currentIndex, setCurrentIndex] = useState(() => stack.length - 1);

  const windowHistoryRef = useRef(window.history);

  const changeCurrentIndex = useCallback(
    (settingIndex?: number) => {
      if (settingIndex) {
        setCurrentIndex(settingIndex);
        return;
      }

      setCurrentIndex(() => {
        const nextIndex = currentIndex - 1;
        if (nextIndex === 0) {
          console.error(
            "현재 웹사이트의 마지막 페이지 입니다.\n뒤로가기 시, 웹사이트를 벗어나게 됩니다."
          );
        }
        return nextIndex;
      });
    },
    [currentIndex]
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
      setCurrentIndex(currentIndex);
    },
    [currentIndex, stack]
  );

  const pushStack = (pathname: string) => {
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
    windowHistory: windowHistoryRef.current,
  };

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
}
