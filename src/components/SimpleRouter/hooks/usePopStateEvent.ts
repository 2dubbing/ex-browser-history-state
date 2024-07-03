import { useEffect } from "react";
import { ContextValueType } from "../Router";

interface Props {
  navigate: ContextValueType["navigate"];
}

/**
 * @name usePopStateEvent
 * @description windows popstate 이벤트핸들러 훅
 */
export default function usePopStateEvent({ navigate }: Props) {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      console.log("popstate event: ", event);
      console.log("popstate pathname: ", window.location.pathname);
      console.log("popstate state: " + JSON.stringify(event.state));

      // navigate(window.location.pathname, { type: "REPLACE" });
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return null;
}
