import React from "react";
import { ReactElement, ReactNode } from "react";

export const isReactComponent = <Props>(
  child: ReactNode
): child is ReactElement<Props> => {
  return React.isValidElement(child);
};
