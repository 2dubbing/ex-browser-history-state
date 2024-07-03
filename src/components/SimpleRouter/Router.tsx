import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useState,
} from "react";
import { NavigateType, RouteItem, RouteProps } from "./type";
import React from "react";
import { isReactComponent } from "../../utils";
import Route from "./Route";
import usePopStateEvent from "./hooks/usePopStateEvent";
import useRouteAnchorTag from "./hooks/useRouteAnchorTag";
import { useHistory } from "../History/useHistory";
import useHistoryListener from "./hooks/useHistoryListener";

const RouteType = (<Route pathname="" />).type;
const isRouteComponent = (
  component: ReactElement
): component is ReactElement<PropsWithChildren<RouteProps>> => {
  return component.type === RouteType;
};

export type ContextValueType = {
  navigate: (pathname: string, option?: { type?: NavigateType }) => void;
};

export const RouterContext = createContext<ContextValueType>(null!);

export default function Router({ children }: PropsWithChildren) {
  const { browserHistory } = useHistory();

  const [routes] = useState<RouteItem[]>(() => {
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
    (pathname: string, option?: { type?: NavigateType }) => {
      const findedRouteItem = existRoutePathname(pathname);
      if (!findedRouteItem) {
        throw Error(`${pathname} 으로 등록된 컴포넌트가 없습니다.`);
      }
      // History 객체에 이동할 페이지정보 push or replace
      if (option?.type === "REPLACE") {
        browserHistory.replace(findedRouteItem.pathname);
        // windowHistory.replaceState({}, "", findedRouteItem.pathname);
      } else if (option?.type === "POP") {
        // *POP ???
        // windowHistory.pushState({}, "", findedRouteItem.pathname);
      } else {
        browserHistory.push(findedRouteItem.pathname);
      }
      setCurrentRouteItem(findedRouteItem);
    },
    [browserHistory, existRoutePathname]
  );

  // 페이지 전환 시 로깅할 이벤트
  useRouteAnchorTag({ navigate });
  usePopStateEvent({ navigate });
  useHistoryListener({ navigate });

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
