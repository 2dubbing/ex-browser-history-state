import React from "react";
import LinkButton from "../components/LinkButton";
import { useHistory } from "../components/History/useHistory";
import usePushHistory from "../hooks/usePushHistory";

type Instance = "w" | "b";

export default function SettingPage() {
  usePushHistory();
  const { windowHistory, browserHistory } = useHistory();

  const handleUseBack = (type: Instance) => {
    if (type === "w") {
      windowHistory.back();
    } else {
      browserHistory.back();
    }
  };

  const handleUseReplace = (type: Instance) => {
    if (type === "w") {
      windowHistory.replaceState({}, "", "/profile");
    } else {
      browserHistory.replace("/profile");
    }
  };

  return (
    <React.Fragment>
      <h2>SettingPage</h2>
      <div className="btn-group">
        <LinkButton onClick={() => handleUseBack("w")}>
          windowHistory.back(뒤로가기)
        </LinkButton>
        <LinkButton onClick={() => handleUseBack("b")}>
          browserHistory.back(뒤로가기)
        </LinkButton>
      </div>

      <div className="btn-group">
        <LinkButton onClick={() => handleUseReplace("w")}>
          windowHistory.replaceState 사용한 뒤로가기
        </LinkButton>
        <LinkButton onClick={() => handleUseReplace("b")}>
          browserHistory.replace 사용한 뒤로가기
        </LinkButton>
      </div>
    </React.Fragment>
  );
}
