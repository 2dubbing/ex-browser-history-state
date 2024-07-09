import { PropsWithChildren } from "react";
import NavigationBar from "./NavigationBar";
import HistoryStackUI from "./HistoryStackUI";
import React from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <React.Fragment>
      <header>
        <NavigationBar />
      </header>
      <article className="main-container">
        <section className="page-wrapper">{children}</section>
        <section className="history-stack-wrapper">
          <HistoryStackUI />
        </section>
      </article>
      <footer></footer>
    </React.Fragment>
  );
}
