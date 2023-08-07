import { Outlet } from "react-router-dom";

export default function GlobalStoreOverusing() {
  return (
    <div>
      <h1>OVER</h1>

      <Outlet />
    </div>
  );
}
