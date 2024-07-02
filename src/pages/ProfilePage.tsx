import React from "react";
import LinkButton from "../components/LinkButton";

export default function ProfilePage() {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <React.Fragment>
      <h2>ProfilePage</h2>
      <div className="btn-group">
        <LinkButton onClick={handleClick}>
          History 뒤로가기(브라우저 뒤로가기)
        </LinkButton>
      </div>
    </React.Fragment>
  );
}
