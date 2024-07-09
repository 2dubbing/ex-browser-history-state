import React from "react";
import { useHistory } from "./History/useHistory";

export default function HistoryStackUI() {
  const { currentIndex, stack } = useHistory();

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
      </div>
    </React.Fragment>
  );
}
