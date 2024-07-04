import React from "react";

export default function HistoryStack() {
  return (
    <React.Fragment>
      <div className="history-stack_title">
        <h2>현재 히스토리 스택</h2>
      </div>
      <div className="history-stack_status">
        <div className="stack">
          <div className="box">
            <span>/</span>
          </div>
          <div className="box">
            <span>/</span>
          </div>
          <div className="box current">
            <span>/</span>
          </div>
          <div className="box">
            <span>/</span>
          </div>
        </div>
        <div className="joystick"></div>
      </div>
    </React.Fragment>
  );
}
