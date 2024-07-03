import React from "react";
import LinkButton from "../components/LinkButton";
import { useHistory } from "../components/History/useHistory";

export default function AboutPage() {
  const { windowHistory, browserHistory, memoryHistory } = useHistory();

  const handleWindowHistory = () => {
    windowHistory.back();
  };
  const handleBrowserHistory = () => {
    browserHistory.back();
  };
  const handleMemoryHistory = () => {
    memoryHistory.back();
  };

  return (
    <React.Fragment>
      <h2>AboutPage</h2>
      <div className="btn-group">
        <LinkButton onClick={handleWindowHistory}>
          window.history 뒤로가기
        </LinkButton>
        <LinkButton onClick={handleBrowserHistory}>
          browser.history 뒤로가기
        </LinkButton>
        <LinkButton onClick={handleMemoryHistory}>
          memory.history 뒤로가기
        </LinkButton>
      </div>
    </React.Fragment>
  );
}
