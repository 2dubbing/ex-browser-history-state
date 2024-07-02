import { PropsWithChildren } from "react";
import NavigationBar from "../components/NavigationBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="page-layout">
      <header>
        <NavigationBar />
      </header>
      <article>{children}</article>
      <footer></footer>
    </div>
  );
}
