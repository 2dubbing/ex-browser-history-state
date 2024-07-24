import { useCallback, useEffect } from "react";

export default function useBeforeUnloadEvent() {
  const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
    const confirmLeave = window.confirm("페이지를 나가겠습니까?");
    if (!confirmLeave) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  return null;
}
