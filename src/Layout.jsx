import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { AppLink } from "./shared/AppLink";

export const Layout = () => (
  <>
    <header className={styles.header}>
      <AppLink to="/">Home</AppLink>
    </header>
    <main className={styles.main}>
      <Outlet />
    </main>
    <footer className={styles.footer}>
      GPL-3.0 license, Drag13,{" "}
      <AppLink to="https://github.com/Drag13/react-code-smells-examples">
        GitHub
      </AppLink>
    </footer>
  </>
);
