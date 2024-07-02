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

const RouteType = (<Route pathname="" />).type;
const isRouteComponent = (
  component: ReactElement
): component is ReactElement<PropsWithChildren<RouteProps>> => {
  return component.type === RouteType;
};

type ContextValueType = {
  navigate: (targetRouteData: RouteItem | RouteItem["pathname"]) => void;
};

export const RouterContext = createContext<ContextValueType>(null!);

export default function Router({ children }: PropsWithChildren) {
  const [routes] = useState<RouteItem[]>(() => {
    console.log("route 등록 처리");
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
      ) || routes[0]
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
    (targetRouteData: RouteItem | RouteItem["pathname"]) => {
      if (typeof targetRouteData === "string") {
        const pathname = targetRouteData;
        const findedRouteItem = existRoutePathname(pathname);
        if (!findedRouteItem) {
          throw Error(`${pathname} 으로 등록된 컴포넌트가 없습니다.`);
        }

        if (findedRouteItem.pathname === window.location.pathname) return;
        // History 객체에 이동할 페이지정보 push
        window.history.pushState({}, "", findedRouteItem.pathname);
        setCurrentRouteItem(findedRouteItem);
      } else {
        if (targetRouteData.pathname === window.location.pathname) return;
        // History 객체에 이동할 페이지정보 push
        window.history.pushState({}, "", targetRouteData.pathname);
        setCurrentRouteItem(targetRouteData);
      }
    },
    [existRoutePathname]
  );

  // 라우팅 이벤트 이펙트
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
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

    window.addEventListener("click", handleClick);

    // 브라우저 뒤로가기 / 앞으로가기 이벤트핸들링
    const handlePopState = (event: PopStateEvent) => {
      console.log("Popstate event triggered!");
      console.log("Type: ", event);
      console.log("Location: " + window.location);
      console.log("State: " + JSON.stringify(event.state));

      window.history.replaceState(event.state, "", window.location.pathname);
      return;
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [existRoutePathname, navigate, routes]);

  const value = { navigate };

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
