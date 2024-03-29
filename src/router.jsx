import { createHashRouter } from "react-router-dom";
import { Layout } from "./Layout";
import ExampleList from "./ExampleList";
import Overstate from "./examples/overstate";
import EffectMissUse from "./examples/effect-for-state";
import CancelEffect from "./examples/cancel-effect";
import UseCallbackOverUse from "./examples/use-callback";
import RedundantConstants from "./examples/redundant-consts";
import GlobalStoreOverusing from "./examples/global-store";
import { GamesPage } from "./examples/global-store/game/game.page";
import { SummaryPage } from "./examples/global-store/game/summary";

const exampleList = [
  { path: "/overstate", label: "Overstate", element: <Overstate /> },
  {
    path: "/cancel-effect",
    label: "Cancel effect",
    element: <CancelEffect />,
  },
  {
    path: "/effect-for-state",
    label: "Misusing effect for state update",
    element: <EffectMissUse />,
  },
  {
    path: "use-callback",
    label: "Overusing useCallback hook",
    element: <UseCallbackOverUse />,
  },

  {
    path: "/redundant-costs",
    label: "Redundant structures in the components",
    element: <RedundantConstants />,
  },
  {
    path: "/global-store",
    label: "Global store overusing",
    element: <GlobalStoreOverusing />,
    children: [
      { index: true, element: <GamesPage /> },
      {
        element: <SummaryPage />,
        path: "summary",
      },
    ],
  },
];

export const router = createHashRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <ExampleList list={exampleList} />,
      },
      ...exampleList,
    ],
  },
]);
