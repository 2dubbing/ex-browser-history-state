import { PAGE_URL_PATHNAMES } from "../../constant";
import { useHistory } from "../History/useHistory";

export default function NavigationBar() {
  const { stack, currentIndex } = useHistory();
  const currentPathname = stack[currentIndex];

  return (
    <nav>
      {PAGE_URL_PATHNAMES.map((item) => (
        <a
          key={item.pathname}
          className={`link${
            item.pathname === currentPathname ? " active" : ""
          }`}
          href={item.pathname}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
