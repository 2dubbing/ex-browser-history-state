import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import Route from "./components/Router/Route";
import HomePage from "./\bpages/HomePage";
import AboutPage from "./\bpages/AboutPage";
import ProfilePage from "./\bpages/ProfilePage";
import SettingPage from "./\bpages/SettingPage";
import Router from "./components/Router/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
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
  </React.Fragment>
);
