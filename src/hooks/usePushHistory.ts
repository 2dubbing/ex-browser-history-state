import { useEffect } from "react";
import { useHistory } from "../components/BrowerHistory/useHistory";

// 브라우저 히스토리에 경로 추가
export default function usePushHistory(pathnames = ["/"]) {
  const { windowHistory } = useHistory();

  useEffect(() => {
    console.log("히스토리 length: ", windowHistory.length);
    setTimeout(() => {
      pathnames.forEach((pathname) => {
        windowHistory.pushState(null, "", pathname);
        console.log("히스토리 length: ", windowHistory.length);
      });
    }, 3000);
  }, [pathnames, windowHistory]);

  return null;
}
