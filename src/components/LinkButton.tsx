import { ComponentPropsWithoutRef, MouseEvent, PropsWithChildren } from "react";
import { useRouter } from "./Router/useRouter";

interface Props extends ComponentPropsWithoutRef<"button"> {
  pathname?: string;
}

export default function LinkButton({
  children,
  pathname,
  ...props
}: PropsWithChildren<Props>) {
  const { navigate } = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    pathname ? navigate(pathname) : props.onClick ? props.onClick(event) : null;
  };

  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
}
