import { useEffect } from "react";
import { useHistory } from "../components/History/useHistory";

const DEFAULT_PATHNAMES = ["/", "/about", "/profile", "/setting"];

// 브라우저 히스토리에 경로 추가
export default function usePushHistory(pathnames = DEFAULT_PATHNAMES) {
  const { windowHistory, browserHistory } = useHistory();

  useEffect(() => {
    setTimeout(() => {
      pathnames.forEach((pathname) => {
        // windowHistory.pushState(null, "", pathname);
        console.log("browser.history index: ", browserHistory.push(pathname));
        console.log("window.history length: ", windowHistory.length);
      });
    }, 3000);
  }, [browserHistory, pathnames, windowHistory]);

  return null;
}
