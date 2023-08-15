import { AppLink } from "../../shared/AppLink";
import { useSelector } from "react-redux";

const DELAY = 1 * 100_000_000;
function doHardWork() {
  let a = 0;
  for (let i = 0; i < DELAY; i++) {
    a++;
  }
}

export function Nav() {
  // CODE SMELL #2 SELECTOR MISUSING
  const store = useSelector((x) => x.store);
  const { user } = store;

  // SAME ISSUE
  //const { user } = useSelector((x) => x.store);
  doHardWork();
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <AppLink to="/global-store/">Ігри </AppLink>
        <AppLink to="/global-store/summary">Підсумки </AppLink>
      </div>
      <div style={{ cursor: "help" }}>{user.name}</div>
    </nav>
  );
}
