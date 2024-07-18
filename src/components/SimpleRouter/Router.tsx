import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NavigateType, RouteItem, RouteProps } from "./type";
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
  navigate: (pathname: string, option?: { type: NavigateType }) => void;
};

export const RouterContext = createContext<ContextValueType>(null!);

export default function Router({ children }: PropsWithChildren) {
  /** @description <Route> 로 등록된 컴포넌트 상태값 */
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

  const {
    currentIndex,
    stack,
    replaceStack,
    replaceUnusedPathnameWithNewPathname,
    windowHistory,
  } = useHistory();
  const currentPathname = stack[currentIndex];

  const existRoutePathname = useCallback(
    (pathname: string = currentPathname) => {
      return routes.find((routeItem) => routeItem.pathname === pathname);
    },
    [currentPathname, routes]
  );

  const [currentRouteItem, setCurrentRouteItem] = useState<RouteItem>(
    existRoutePathname() ?? routes[0]
  );

  useEffect(() => {
    setCurrentRouteItem(existRoutePathname() ?? routes[0]);
  }, [currentPathname, existRoutePathname, routes]);

  const navigate = useCallback(
    (pathname: string, option?: { type: NavigateType }) => {
      console.log("navigate: ", pathname, option);

      const findedRouteItem = existRoutePathname(pathname);
      if (!findedRouteItem) {
        throw Error(`${pathname} 으로 등록된 컴포넌트가 없습니다.`);
      }

      // CASE 1
      if (option?.type === "PUSH") {
        windowHistory.pushState({}, "", findedRouteItem.pathname);
        replaceUnusedPathnameWithNewPathname(findedRouteItem.pathname);
      } else {
        windowHistory.replaceState({}, "", findedRouteItem.pathname);
        replaceStack(findedRouteItem.pathname);
      }

      setCurrentRouteItem(findedRouteItem);
    },
    [
      existRoutePathname,
      replaceStack,
      replaceUnusedPathnameWithNewPathname,
      windowHistory,
    ]
  );

  useRouteAnchorTag({ navigate });
  usePopStateEvent();
  // useBeforeUnloadEvent();

  const value = { navigate };

  return (
    <RouterContext.Provider value={value}>
      {currentRouteItem && currentRouteItem.component}
    </RouterContext.Provider>
  );
}
