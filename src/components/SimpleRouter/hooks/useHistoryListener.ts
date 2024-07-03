import { useEffect } from "react";
import { useHistory } from "../../History/useHistory";
import { ContextValueType } from "../Router";

interface Props {
  navigate: ContextValueType["navigate"];
}

export default function useHistoryListener({ navigate }: Props) {
  const { browserHistory } = useHistory();

  useEffect(() => {
    const unlisten = browserHistory.listen(({ location, action }) => {
      console.log("browserHistory action: ", action);
      console.log("browserHistory pathname: ", location.pathname);
      console.log("browserHistory state: " + JSON.stringify(location.state));
    });
    return () => unlisten();
  }, [browserHistory]);

  return null;
}
