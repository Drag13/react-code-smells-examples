import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { globalStore } from "./global.store";
import { Nav } from "./nav";

export default function GlobalStoreOverusing() {
  return (
    <Provider store={globalStore}>
      <Nav />
      <Outlet />
    </Provider>
  );
}
