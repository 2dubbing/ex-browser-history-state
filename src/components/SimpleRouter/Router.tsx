import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useState,
} from "react";
import { RouteItem, RouteProps } from "./type";
import React from "react";
import { isReactComponent } from "../../utils";
import Route from "./Route";
import usePopStateEvent from "./hooks/usePopStateEvent";
import useRouteAnchorTag from "./hooks/useRouteAnchorTag";
import { useHistory } from "../History/useHistory";

const RouteType = (<Route pathname="" />).type;
const isRouteComponent = (
  component: ReactElement
): component is ReactElement<PropsWithChildren<RouteProps>> => {
  return component.type === RouteType;
};

export type ContextValueType = {
  navigate: (pathname: string, option?: { replace?: boolean }) => void;
};

export const RouterContext = createContext<ContextValueType>(null!);

export default function Router({ children }: PropsWithChildren) {
  const { windowHistory } = useHistory();

  const [routes] = useState<RouteItem[]>(() => {
    console.log("최초 window history length: ", windowHistory.length);
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

  const navigate = useCallback(
    (pathname: string, option?: { replace?: boolean }) => {
      const findedRouteItem = existRoutePathname(pathname);
      if (!findedRouteItem) {
        throw Error(`${pathname} 으로 등록된 컴포넌트가 없습니다.`);
      }

      // History 객체에 이동할 페이지정보 push or replace
      if (option?.replace) {
        windowHistory.replaceState({}, "", findedRouteItem.pathname);
      } else {
        windowHistory.pushState({}, "", findedRouteItem.pathname);
      }
      setCurrentRouteItem(findedRouteItem);
    },
    [existRoutePathname, windowHistory]
  );

  // 페이지 전환 이벤트 훅
  useRouteAnchorTag({ navigate });
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
