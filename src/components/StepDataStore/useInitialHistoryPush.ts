import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StepType } from "../../types";
import { PAGE_DATA } from "../../constant";
import { delay } from "../../utils";

const getState = () => {
  if (document.visibilityState === "hidden") {
    return "hidden";
  }
  if (document.hasFocus()) {
    return "active";
  }
  return "passive";
};

// Stores the initial state using the `getState()` function (defined above).
let state = getState();

// Accepts a next state and, if there's been a state change, logs the
// change to the console. It also updates the `state` value defined above.
const logStateChange = (nextState) => {
  const prevState = state;
  if (nextState !== prevState) {
    console.log(`State change: ${prevState} >>> ${nextState}`);
    state = nextState;
  }
};

// Options used for all event listeners.
const opts = { capture: true };

// These lifecycle events can all use the same listener to observe state
// changes (they call the `getState()` function to determine the next state).
["pageshow", "focus", "blur", "visibilitychange", "resume"].forEach((type) => {
  window.addEventListener(type, () => logStateChange(getState(), opts));
});

// The next two listeners, on the other hand, can determine the next
// state from the event itself.
window.addEventListener(
  "freeze",
  () => {
    // In the freeze event, the next state is always frozen.
    logStateChange("frozen");
  },
  opts
);

window.addEventListener(
  "pagehide",
  (event) => {
    // If the event's persisted property is `true` the page is about
    // to enter the back/forward cache, which is also in the frozen state.
    // If the event's persisted property is not `true` the page is
    // about to be unloaded.
    logStateChange(event.persisted ? "frozen" : "terminated");
  },
  opts
);

/////////////////////////

const stepPagePathnames = PAGE_DATA.map((data) => data.pathname);

export default function useInitialHistoryPush() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const pathnames: string[] = [];

    switch (Number(id) as Exclude<StepType, 0>) {
      case 1:
        pathnames.push(stepPagePathnames[1]);
        break;

      case 2:
        pathnames.push(stepPagePathnames[1], stepPagePathnames[2]);
        break;

      case 3:
        pathnames.push(
          stepPagePathnames[1],
          stepPagePathnames[2],
          stepPagePathnames[3]
        );
        break;

      default:
        return;
    }

    delay(1000).then(() => {
      window.history.replaceState(null, "", stepPagePathnames[0]);
      pathnames.forEach((p) => window.history.pushState(null, "", p));
      console.log("history length: ", window.history.length);
    });

    // setTimeout(() => {
    //   window.history.replaceState(null, "", stepPagePathnames[0]);
    //   pathnames.forEach((p) => window.history.pushState(null, "", p));
    //   console.log("history length: ", window.history.length);
    // }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
