import { Suspense } from "react";
import NavigationBar from "./NavigationBar";
import StepPageController from "../StepDataStore/StepDataStore";
import { Outlet } from "react-router-dom";
import React from "react";

export default function Layout() {
  return (
    <React.Fragment>
      <header>
        <NavigationBar />
      </header>
      <article className="main-container">
        <section className="page-wrapper">
          <Suspense fallback={<p>데이터 로딩 중...</p>}>
            <StepPageController>
              <Outlet />
            </StepPageController>
          </Suspense>
        </section>
      </article>
      <footer></footer>
    </React.Fragment>
  );
}
