import { useCallback, useEffect } from "react";
import { ContextValueType } from "../Router";

interface Props {
  navigate: ContextValueType["navigate"];
}

/**
 * @name useRouteAnchorTag
 * @description a 태그에 의한 라우트핸들러 훅
 */
export default function useRouteAnchorTag({ navigate }: Props) {
  const handleClickAnchorTag = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (!event.target || (event.target as HTMLElement).tagName !== "A") {
        return;
      }
      const $anchor = event.target as HTMLAnchorElement;
      navigate($anchor.pathname, { type: "PUSH" });
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickAnchorTag);
    return () => {
      window.removeEventListener("click", handleClickAnchorTag);
    };
  }, [handleClickAnchorTag]);

  return null;
}
