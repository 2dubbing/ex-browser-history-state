import { useEffect } from "react";

// 브라우저 히스토리에 경로 추가
export default function usePushHistory(pathnames = ["/"]) {
  useEffect(() => {
    console.log("히스토리 length: ", window.history.length);
    setTimeout(() => {
      pathnames.forEach((pathname) => {
        window.history.pushState(null, "", pathname);
        console.log("히스토리 length: ", window.history.length);
      });
    }, 3000);
  }, [pathnames]);

  return null;
}
