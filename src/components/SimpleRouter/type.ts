import { PropsWithChildren } from "react";

export type RouteItem = {
  pathname: string;
  component: React.ReactElement;
};

export type RouteProps = PropsWithChildren<{
  pathname: string;
  component?: React.ReactElement;
}>;

export type NavigateType = "PUSH" | "POP" | "REPLACE";
