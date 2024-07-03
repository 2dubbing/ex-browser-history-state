import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { RouteItem, RouteProps } from "./type";
import React from "react";
import { isReactComponent } from "../../utils";
import Route from "./Route";
import usePopStateEvent from "./hooks/usePopStateEvent";

const RouteType = (<Route pathname="" />).type;
const isRouteComponent = (
  component: ReactElement
): component is ReactElement<PropsWithChildren<RouteProps>> => {
  return component.type === RouteType;
};

export type ContextValueType = {
  navigate: (
    targetRouteData: RouteItem | RouteItem["pathname"],
    option?: { replace?: boolean }
  ) => void;
};

export const RouterContext = createContext<ContextValueType>(null!);

export default function Router({ children }: PropsWithChildren) {
  const [routes] = useState<RouteItem[]>(() => {
    console.log("최초 히스토리 length: ", window.history.length);
    console.log("route 등록");
    return (
      React.Children.map(children, (routeComponent) => {
        if (
          !(
            isReactComponent(routeComponent) && isRouteComponent(routeComponent)
          )
        ) {
          throw Error(
            "Router 컴포넌트의 child 컴포넌트는 Route Component 만 사용됩니다."
          );
        }
        return {
          pathname: routeComponent.props.pathname,
          component: routeComponent.props.children,
        } as RouteItem;
      }) || []
    );
  });

  const [currentRouteItem, setCurrentRouteItem] = useState<RouteItem>(() => {
    return (
      routes.find(
        (routeItem) => routeItem.pathname === window.location.pathname
      ) ?? routes[0]
    );
  });

  const existRoutePathname = useCallback(
    (pathname: string) => {
      return routes.find((routeItem) => routeItem.pathname === pathname);
    },
    [routes]
  );

  // TODO: navigate 내부로직 중복부분 리팩토링
  const navigate = useCallback(
    (
      targetRouteData: RouteItem | RouteItem["pathname"],
      option?: { replace?: boolean }
    ) => {
      if (typeof targetRouteData === "string") {
        const pathname = targetRouteData;
        const findedRouteItem = existRoutePathname(pathname);
        if (!findedRouteItem) {
          throw Error(`${pathname} 으로 등록된 컴포넌트가 없습니다.`);
        }

        // History 객체에 이동할 페이지정보 push or replace
        if (option?.replace) {
          window.history.replaceState({}, "", findedRouteItem.pathname);
        } else {
          window.history.pushState({}, "", findedRouteItem.pathname);
        }
        setCurrentRouteItem(findedRouteItem);
      } else {
        window.history.pushState({}, "", targetRouteData.pathname);
        setCurrentRouteItem(targetRouteData);
      }
    },
    [existRoutePathname]
  );

  // 라우팅 이벤트 이펙트
  useEffect(() => {
    const handleClickAnchorTag = (event: MouseEvent) => {
      event.preventDefault();
      if (!event.target || (event.target as HTMLElement).tagName !== "A") {
        return;
      }

      const $anchor = event.target as HTMLAnchorElement;
      const findedRouteItem = existRoutePathname($anchor.pathname);
      if (!findedRouteItem) {
        throw Error(`${$anchor.pathname} 으로 등록된 컴포넌트가 없습니다.`);
      }
      navigate(findedRouteItem);
    };

    window.addEventListener("click", handleClickAnchorTag);

    return () => {
      window.removeEventListener("click", handleClickAnchorTag);
    };
  }, [existRoutePathname, navigate, routes]);

  usePopStateEvent({ navigate });

  const value = { navigate };

  console.log("현재 렌더 컴포넌트: ", currentRouteItem);

  return (
    <RouterContext.Provider value={value}>
      {currentRouteItem ? (
        currentRouteItem.component
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </RouterContext.Provider>
  );
}
