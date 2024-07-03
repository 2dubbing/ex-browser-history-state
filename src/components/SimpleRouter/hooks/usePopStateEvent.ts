import { useEffect } from "react";
import { ContextValueType } from "../Router";

interface Props {
  navigate: ContextValueType["navigate"];
}

export default function usePopStateEvent({ navigate }: Props) {
  useEffect(() => {
    // 브라우저 뒤로가기 / 앞으로가기 이벤트핸들링
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
  }, []);

  return null;
}
