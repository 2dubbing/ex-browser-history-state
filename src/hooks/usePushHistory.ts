import { useEffect } from "react";

export default function usePushHistory(pathnames = ["/"]) {
  useEffect(() => {
    // * 브라우저 히스토리에 루트경로 강제 주입
    setTimeout(() => {
      const cached = window.location.pathname;
      pathnames.forEach((pathname) => {
        window.history.pushState(null, "", pathname);
      });
      window.history.replaceState(null, "", cached);
    }, 0);
  }, [pathnames]);

  return null;
}
