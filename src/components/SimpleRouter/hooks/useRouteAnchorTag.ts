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
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!event.target || (event.target as HTMLElement).tagName !== "A") {
        return;
      }

      // Anchor tag
      event.preventDefault();
      const $anchor = event.target as HTMLAnchorElement;
      navigate($anchor.pathname, { type: "PUSH" });
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return null;
}
