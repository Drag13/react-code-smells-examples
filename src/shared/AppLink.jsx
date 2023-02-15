import { NavLink } from "react-router-dom";
import styles from "./AppLink.module.css";

export function AppLink({ to, children, className }) {
  return (
    <NavLink className={`${styles.root} ${className ?? ""}`} to={to}>
      {children}
    </NavLink>
  );
}
