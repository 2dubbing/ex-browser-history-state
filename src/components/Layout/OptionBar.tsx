import { SyntheticEvent } from "react";
import { HISTORY_STATE_TYPE } from "../../constant";
import { useLayout } from "./useLayout";
import { NavigateType } from "../../types";

export default function OptionBar() {
  const { historyStateType, changeHistoryStateType } = useLayout();

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    changeHistoryStateType(value as NavigateType);
  };

  return (
    <aside className="option-wrapper">
      <p>history 방식 선택: </p>

      <div className="radio-group">
        <label htmlFor="push">
          pushState
          <input
            id="push"
            name="historyStateType"
            type="radio"
            value={HISTORY_STATE_TYPE["PUSH"]}
            checked={historyStateType === HISTORY_STATE_TYPE["PUSH"]}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="replace">
          replaceState
          <input
            id="replace"
            name="historyStateType"
            type="radio"
            value={HISTORY_STATE_TYPE["REPLACE"]}
            checked={historyStateType === HISTORY_STATE_TYPE["REPLACE"]}
            onChange={handleChange}
          />
        </label>
      </div>
    </aside>
  );
}
