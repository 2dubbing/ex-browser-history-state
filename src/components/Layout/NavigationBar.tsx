import { PAGE_DATA } from "../../constant";
import { useLocation } from "react-router-dom";

export default function NavigationBar() {
  const { pathname } = useLocation();

  return (
    <nav>
      {PAGE_DATA.map((item) => (
        <span
          key={item.pathname}
          className={`link${item.pathname === pathname ? " active" : ""}`}
        >
          {item.label}
        </span>
      ))}
    </nav>
  );
}
