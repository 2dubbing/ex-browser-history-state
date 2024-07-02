import React from "react";
import { isReactComponent } from "../../utils";
import { RouteProps } from "./type";

export default function Route({ children }: RouteProps) {
  if (React.Children.count(children) !== 1) {
    throw Error("Route 컴포넌트에는 1개의 child 컴포넌트만 사용됩니다.");
  }

  if (!isReactComponent(children)) {
    throw Error(
      "Route 컴포넌트의 child 컴포넌트는 React Component 만 사용됩니다."
    );
  }

  return null;
}
