export const PAGE_URL_PATHNAMES = [
  {
    pathname: "/",
    label: "메인",
  },
  { pathname: "/step/1", label: "1단계" },
  { pathname: "/step/2", label: "2단계" },
  {
    pathname: "/step/3",
    label: "3단계",
  },
] as const;

export const HISTORY_STATE_TYPE = { PUSH: "PUSH", REPLACE: "REPLACE" } as const;
