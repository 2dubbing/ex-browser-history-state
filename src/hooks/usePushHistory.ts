import { useEffect } from "react";

export default function usePushHistory(pathname = "/") {
  useEffect(() => {
    // * 브라우저 히스토리에 루트경로 강제 주입
    setTimeout(() => {
      const cached = window.location.pathname;
      window.history.replaceState(null, "", pathname);
      window.history.pushState(null, "", cached);
    }, 500);
  }, [pathname]);

  return null;
}
