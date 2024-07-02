import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import Route from "./components/Router/Route";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import Router from "./components/Router/Router";
import Layout from "./pages/Layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <Layout>
      <Router>
        <Route pathname="/">
          <HomePage />
        </Route>
        <Route pathname="/about">
          <AboutPage />
        </Route>
        <Route pathname="/profile">
          <ProfilePage />
        </Route>
        <Route pathname="/setting">
          <SettingPage />
        </Route>
      </Router>
    </Layout>
  </React.Fragment>
);
