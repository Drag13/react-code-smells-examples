import { AppLink } from "../../shared/AppLink";
import { useSelector } from "react-redux";

export function Nav() {
  const { store } = useSelector((x) => x);
  const { user } = store;
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <AppLink to="/global-store/">Ігри </AppLink>
      </div>
      <div>{user.name}</div>
    </nav>
  );
}
