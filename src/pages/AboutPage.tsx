import React from "react";
import LinkButton from "../components/LinkButton";
import { useHistory } from "../components/BrowerHistory/useHistory";

export default function AboutPage() {
  const { windowHistory } = useHistory();

  const handleClick = () => {
    windowHistory.back();
  };

  return (
    <React.Fragment>
      <h2>AboutPage</h2>
      <div className="btn-group">
        <LinkButton onClick={handleClick}>
          History 뒤로가기(브라우저 뒤로가기)
        </LinkButton>
      </div>
    </React.Fragment>
  );
}
