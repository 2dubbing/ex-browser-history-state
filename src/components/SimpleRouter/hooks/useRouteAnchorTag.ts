import { useEffect } from "react";
import { ContextValueType } from "../Router";

interface Props {
  navigate: ContextValueType["navigate"];
}

/**
 * @name useRouteAnchorTag
 * @description a 태그에 의한 라우트핸들러 훅
 */
export default function useRouteAnchorTag({ navigate }: Props) {
  useEffect(() => {
    const handleClickAnchorTag = (event: MouseEvent) => {
      event.preventDefault();
      if (!event.target || (event.target as HTMLElement).tagName !== "A") {
        return;
      }
      const $anchor = event.target as HTMLAnchorElement;
      navigate($anchor.pathname);
    };
    window.addEventListener("click", handleClickAnchorTag);

    return () => {
      window.removeEventListener("click", handleClickAnchorTag);
    };
  }, [navigate]);

  return null;
}
