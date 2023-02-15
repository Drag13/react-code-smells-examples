import { AppLink } from "./AppLink";
import styles from "./AppLogo.module.css";

export function AppLogo() {
  return (
    <AppLink className={styles.root} to="/">
      React Code Smells
    </AppLink>
  );
}
