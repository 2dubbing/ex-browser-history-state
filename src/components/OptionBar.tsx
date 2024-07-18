import { SyntheticEvent, useState } from "react";
import { NavigateType } from "./SimpleRouter/type";
import { HISTORY_STATE_TYPE } from "../constant";

export default function OptionBar() {
  const [value, setValue] = useState<NavigateType>(HISTORY_STATE_TYPE["PUSH"]);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setValue(value as NavigateType);
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
            checked={value === HISTORY_STATE_TYPE["PUSH"]}
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
            checked={value === HISTORY_STATE_TYPE["REPLACE"]}
            onChange={handleChange}
          />
        </label>
      </div>
    </aside>
  );
}
