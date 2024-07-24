import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { StepType } from "../../types";
import { PAGE_DATA } from "../../constant";

const stepPagePathnames = PAGE_DATA.map((data) => data.pathname);

export default function useInitialHistoryPush() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const pathnames: string[] = [];

    switch (Number(id) as Exclude<StepType, 0>) {
      case 1:
        pathnames.push(stepPagePathnames[1]);
        break;

      case 2:
        pathnames.push(stepPagePathnames[1], stepPagePathnames[2]);
        break;

      case 3:
        pathnames.push(
          stepPagePathnames[1],
          stepPagePathnames[2],
          stepPagePathnames[3]
        );
        break;

      default:
        return;
    }

    // history.replace(stepPagePathnames[0]);
    // pathnames.forEach((p) => history.push(p));
    setTimeout(() => {
      window.history.replaceState(null, "", stepPagePathnames[0]);
      pathnames.forEach((p) => window.history.pushState(null, "", p));

      console.log("history length: ", window.history.length);
    }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
