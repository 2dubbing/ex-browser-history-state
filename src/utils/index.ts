import React from "react";
import { ReactElement, ReactNode } from "react";

export const isReactComponent = <Props>(
  child: ReactNode
): child is ReactElement<Props> => {
  return React.isValidElement(child);
};

type PromiseStatusType = "pending" | "success" | "error";
const wrapPromise = <T>(promise: Promise<T>) => {
  let status: PromiseStatusType = "pending";
  let result: T | never;

  const suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw result;
      default:
        return result;
    }
  };

  return { read };
};

export const wrapPromiseWithSuspense = <T>(fetcher: () => Promise<T>) => {
  const promise = fetcher()
    .then((res: T) => res)
    .catch((err) => err);
  return wrapPromise<T>(promise);
};
