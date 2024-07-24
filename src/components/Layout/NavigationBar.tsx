import { useNavigate } from "react-router-dom";
import { PAGE_DATA } from "../../constant";
import { SyntheticEvent } from "react";

export default function NavigationBar() {
  const navigate = useNavigate();
  const currentPathname = window.location.pathname;

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    const $anchor = event.target as HTMLAnchorElement;
    if ($anchor.pathname === currentPathname) return;
    navigate($anchor.pathname);
  };

  return (
    <nav>
      {PAGE_DATA.map((item) => (
        <a
          key={item.pathname}
          className={`link${
            item.pathname === currentPathname ? " active" : ""
          }`}
          href={item.pathname}
          onClick={handleClick}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
