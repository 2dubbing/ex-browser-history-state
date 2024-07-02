import { useEffect } from "react";
import { useRouter } from "../components/SimpleRouter";

export default function usePushHistory(pathnames = ["/"]) {
  const { traceHistoryStack, setTraceHistoryStack } = useRouter();

  useEffect(() => {
    // * 브라우저 히스토리에 경로 추가
    console.log("히스토리 length: ", window.history.length);
    setTimeout(() => {
      pathnames.forEach((pathname) => {
        // setTraceHistoryStack(traceHistoryStack.concat(pathname));
        window.history.pushState(null, "", pathname);
        console.log("pathname추가: ", pathname);
        console.log("히스토리 length: ", window.history.length);
      });
      // window.history.replaceState(null, "", cached);
    }, 3000);
    setTraceHistoryStack(traceHistoryStack.concat(...pathnames));
    console.log("traceHistoryStack: ", traceHistoryStack);
  }, []);

  return null;
}
