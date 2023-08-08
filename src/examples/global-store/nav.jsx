import { AppLink } from "../../shared/AppLink";
import { useSelector } from "react-redux";

const DELAY = 100_000_000;
function doHardWork() {
  let a = 0;
  for (let i = 0; i < DELAY; i++) {
    a++;
  }
}

export function Nav() {
  const { store } = useSelector((x) => x);
  const { user } = store;
  doHardWork();
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <AppLink to="/global-store/">Ігри </AppLink>
      </div>
      <div>{user.name}</div>
    </nav>
  );
}
