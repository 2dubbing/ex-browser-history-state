import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/MainPage";
import StepOnePage from "./pages/StepOnePage";
import StepTwoPage from "./pages/StepTwoPage";
import StepThreePage from "./pages/StepThreePage";
import Layout from "./components/Layout/Layout";
import SimpleRouter from "./components/SimpleRouter";
import History from "./components/History/History";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <History>
      <Layout>
        <SimpleRouter.Router>
          <SimpleRouter.Route pathname="/">
            <HomePage />
          </SimpleRouter.Route>
          <SimpleRouter.Route pathname="/step/1">
            <StepOnePage />
          </SimpleRouter.Route>
          <SimpleRouter.Route pathname="/step/2">
            <StepTwoPage />
          </SimpleRouter.Route>
          <SimpleRouter.Route pathname="/step/3">
            <StepThreePage />
          </SimpleRouter.Route>
        </SimpleRouter.Router>
      </Layout>
    </History>
  </React.StrictMode>
);
