import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import Layout from "./pages/Layout";
import SimpleRouter from "./components/SimpleRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Layout>
      <SimpleRouter.Router>
        <SimpleRouter.Route pathname="/">
          <HomePage />
        </SimpleRouter.Route>
        <SimpleRouter.Route pathname="/about">
          <AboutPage />
        </SimpleRouter.Route>
        <SimpleRouter.Route pathname="/profile">
          <ProfilePage />
        </SimpleRouter.Route>
        <SimpleRouter.Route pathname="/setting">
          <SettingPage />
        </SimpleRouter.Route>
      </SimpleRouter.Router>
    </Layout>
  </React.Fragment>
);
