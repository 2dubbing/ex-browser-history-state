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
          <input
            id="push"
            name="historyStateType"
            type="radio"
            value={value}
            checked={value === HISTORY_STATE_TYPE["PUSH"]}
            onChange={handleChange}
          />
          pushState
        </label>

        <label htmlFor="replace">
          <input
            id="replace"
            name="historyStateType"
            type="radio"
            value={value}
            checked={value === HISTORY_STATE_TYPE["REPLACE"]}
            onChange={handleChange}
          />
          replaceState
        </label>
      </div>
    </aside>
  );
}
