import React from "react";
import LinkButton from "../components/LinkButton";
import { useHistory } from "../components/History/useHistory";

export default function ProfilePage() {
  const { windowHistory, browserHistory } = useHistory();

  const handleWindowHistory = () => {
    windowHistory.back();
  };
  const handleBrowserHistory = () => {
    browserHistory.back();
  };

  return (
    <React.Fragment>
      <h2>ProfilePage</h2>
      <div className="btn-group">
        <LinkButton onClick={handleWindowHistory}>
          windowHistory.back(뒤로가기)
        </LinkButton>
        <LinkButton onClick={handleBrowserHistory}>
          browserHistory.back(뒤로가기)
        </LinkButton>
      </div>
    </React.Fragment>
  );
}
