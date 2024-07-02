import React from "react";
import LinkButton from "../components/LinkButton";
import usePushHistory from "../hooks/usePushHistory";

export default function SettingPage() {
  usePushHistory(["/", "/about", "/profile", "/setting"]);

  const handleClick = () => {
    window.history.back();
  };

  return (
    <React.Fragment>
      <h2>SettingPage</h2>
      <div className="btn-group">
        <LinkButton onClick={handleClick}>
          History 뒤로가기(브라우저 뒤로가기)
        </LinkButton>
      </div>
    </React.Fragment>
  );
}
