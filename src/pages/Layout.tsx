import { PropsWithChildren } from "react";
import NavigationBar from "../components/NavigationBar";
import HistoryStack from "../components/HistoryStack";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="page-layout">
      <header>
        <NavigationBar />
      </header>
      <article className="content-wrapper">
        <section>{children}</section>
        <section className="history-stack-wrapper">
          <HistoryStack />
        </section>
      </article>
      <footer></footer>
    </div>
  );
}
