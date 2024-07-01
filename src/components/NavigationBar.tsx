import { PAGE_URL_PATHNAMES } from "../constant";

export default function NavigationBar() {
  return (
    <nav>
      {PAGE_URL_PATHNAMES.map((item) => (
        <a key={item.pathname} href={item.pathname}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
