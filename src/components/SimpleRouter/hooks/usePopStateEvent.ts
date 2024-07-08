import { useCallback, useEffect } from "react";
import { useHistory } from "../../History/useHistory";

/**
 * @name usePopStateEvent
 * @description 브라우저 뒤로가기 & 앞으로가기 이벤트핸들링
 */
export default function usePopStateEvent() {
  const { changeCurrentIndex } = useHistory();

  const handlePopState = useCallback(
    (event: PopStateEvent) => {
      console.log("=======================");
      console.log("popstate event: ", event);
      console.log("popstate pathname: ", window.location.pathname);
      console.log("popstate state: " + JSON.stringify(event.state));
      console.log("=======================");

      // 뒤로가기 & 앞으로가기 구분할 수 있는 방법?
      changeCurrentIndex();
    },
    [changeCurrentIndex]
  );

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handlePopState]);

  return null;
}
