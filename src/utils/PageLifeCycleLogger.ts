type DocumentVisibilityStateType =
  | "hidden"
  | "active"
  | "passive"
  | "frozen"
  | "terminated";

/**
 * @description google chrome 개발자 블로그 - 페이지 수명 주기 API
 * https://developer.chrome.com/docs/web-platform/page-lifecycle-api?hl=ko#how_to_observe_page_lifecycle_states_in_code
 */
export default class WebPageLifeCycleLogger {
  private tracingEventTypes = [
    "pageshow",
    "focus",
    "blur",
    "visibilitychange",
    "resume",
    "click",
    "focus",
  ];
  private state: DocumentVisibilityStateType;
  private target: Window;
  static instance: WebPageLifeCycleLogger;

  private constructor(window: Window) {
    this.target = window;
    this.state = this.getState();
    this.attachEventListener();
  }

  static start(window: Window) {
    if (this.instance) return;
    this.instance = new WebPageLifeCycleLogger(window);
  }

  private getState() {
    const { document } = this.target;
    console.log("document.visibilityState: ", document.visibilityState);

    if (document.visibilityState === "hidden") {
      return "hidden";
    }
    if (document.hasFocus()) {
      return "active";
    }
    return "passive";
  }

  private attachEventListener() {
    // Options used for all event listeners.
    const opts = { capture: true };

    // These lifecycle events can all use the same listener to observe state
    // changes (they call the `getState()` function to determine the next state).
    this.tracingEventTypes.forEach((type) => {
      this.target.addEventListener(
        type,
        () => this.logStateChange(type, this.getState()),
        opts
      );
    });

    // The next two listeners, on the other hand, can determine the next
    // state from the event itself.
    this.target.addEventListener(
      "freeze",
      () => {
        // In the freeze event, the next state is always frozen.
        this.logStateChange("freeze", "frozen");
      },
      opts
    );

    this.target.addEventListener(
      "pagehide",
      (event) => {
        // If the event's persisted property is `true` the page is about
        // to enter the back/forward cache, which is also in the frozen state.
        // If the event's persisted property is not `true` the page is
        // about to be unloaded.
        this.logStateChange(
          "pagehide",
          event.persisted ? "frozen" : "terminated"
        );
      },
      opts
    );
  }

  // Accepts a next state and, if there's been a state change, logs the
  // change to the console. It also updates the `state` value defined above.
  private logStateChange(
    eventType: (typeof this.tracingEventTypes)[number] | "pagehide" | "freeze",
    nextState: DocumentVisibilityStateType
  ) {
    console.log("이벤트 콜백! eventType: ", eventType);

    const prevState = this.state;
    if (nextState !== prevState) {
      console.log(`Page State change: ${prevState} >>> ${nextState}`);
      this.state = nextState;
    }
  }
}
