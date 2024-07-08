import React from "react";
import { useHistory } from "./History/useHistory";
import LinkButton from "./LinkButton";

export default function HistoryStack() {
  const { currentIndex, stack } = useHistory();

  const handleHistoryBack = () => {};

  const handleHistoryForward = () => {};

  return (
    <React.Fragment>
      <div className="history-stack_title">
        <h4>현재 도메인에 대한 브라우저 History Stack</h4>
        <p>CurrentIndex: {currentIndex}</p>
      </div>

      <div className="history-stack_status">
        <div className="stack">
          {stack.map((pathname, idx) => (
            <div
              className={`box ${idx === currentIndex ? " current" : ""}`}
              key={pathname + idx}
            >
              <span>{`pathname: ${pathname}`}</span>
              <span>{`index: ${idx}`}</span>
            </div>
          ))}
        </div>

        <div className="joystick">
          {/* <div className="btn-group">
            <LinkButton onClick={handleHistoryBack}>history.back()</LinkButton>
            <LinkButton onClick={handleHistoryForward}>
              history.forward()
            </LinkButton>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}
