import { createContext, PropsWithChildren, Suspense } from "react";
import HistoryStackUI from "../HistoryStackUI";
import NavigationBar from "./NavigationBar";
import StepPageController from "../StepPageController/StepPageController";

export const LayoutContext = createContext({});

export default function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutContext.Provider value={{}}>
      <header>
        <NavigationBar />
      </header>
      <article className="main-container">
        <section className="page-wrapper">
          <Suspense fallback={<p>데이터 로딩 중...</p>}>
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
