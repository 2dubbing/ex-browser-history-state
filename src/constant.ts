export const PAGE_DATA = [
  {
    pathname: "/",
    label: "메인",
    step: 0,
    isCompleted: {
      true: { nextStep: null, prevStep: null },
      false: { nextStep: 1, prevStep: null },
    },
  },
  {
    pathname: "/step/1",
    label: "1단계",
    step: 1,
    isCompleted: {
      true: { nextStep: 2, prevStep: 1 },
      false: { nextStep: null, prevStep: null },
    },
  },
  {
    pathname: "/step/2",
    label: "2단계",
    step: 2,
    isCompleted: {
      true: { nextStep: 3, prevStep: 1 },
      false: { nextStep: null, prevStep: 1 },
    },
  },
  {
    pathname: "/step/3",
    label: "3단계",
    step: 3,
    isCompleted: {
      true: { nextStep: 0, prevStep: 2 },
      false: { nextStep: null, prevStep: 2 },
    },
  },
] as const;

export const HISTORY_STATE_TYPE = { PUSH: "PUSH", REPLACE: "REPLACE" } as const;
