import { PropsWithChildren } from "react";
import { HISTORY_STATE_TYPE } from "../../constant";

export type RouteItem = {
  pathname: string;
  component: React.ReactElement;
};

export type RouteProps = PropsWithChildren<{
  pathname: string;
  component?: React.ReactElement;
}>;

export type NavigateType = keyof typeof HISTORY_STATE_TYPE;
