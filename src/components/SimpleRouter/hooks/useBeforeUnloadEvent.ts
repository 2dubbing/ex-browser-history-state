import { useCallback, useEffect } from "react";
import { useHistory } from "../../History/useHistory";

export default function useBeforeUnloadEvent() {
  const { currentIndex } = useHistory();

  const handleBeforeUnload = useCallback(
    (event: BeforeUnloadEvent) => {
      if (currentIndex === 0) {
        const confirmLeave = window.confirm("페이지를 나가겠습니까?");
        if (!confirmLeave) {
          event.preventDefault();
        }
      }
    },
    [currentIndex]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  return null;
}
