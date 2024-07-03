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
      console.log("Popstate event triggered!");
      console.log("Type: ", event);
      console.log("Location: " + window.location);
      console.log("State: " + JSON.stringify(event.state));

      navigate(window.location.pathname, { replace: true });
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return null;
}
