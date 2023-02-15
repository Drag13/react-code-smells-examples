import { NavLink } from "react-router-dom";
import styles from "./AppLink.module.css";

export function AppLink({ to, children }) {
  return (
    <NavLink className={styles.root} to={to}>
      {children}
    </NavLink>
  );
}
