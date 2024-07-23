import { PropsWithChildren } from "react";
import { HISTORY_STATE_TYPE, PAGE_DATA } from "./constant";

export type RouteItem = {
  pathname: string;
  component: React.ReactElement;
};

export type RouteProps = PropsWithChildren<{
  pathname: string;
  component?: React.ReactElement;
}>;

export type NavigateType = keyof typeof HISTORY_STATE_TYPE;

export type StepType = (typeof PAGE_DATA)[number]["step"];
export type StepCondition = (typeof PAGE_DATA)[number]["isCompleted"]
