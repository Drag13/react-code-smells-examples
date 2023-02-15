import { createHashRouter } from "react-router-dom";
import { Layout } from "./Layout";
import ExampleList from "./ExampleList";
import Overstate from "./examples/overstate";
import EffectMissUse from "./examples/effect-for-state";

const exampleList = [
  { path: "/overstate", label: "Overstate", element: <Overstate /> },
  {
    path: "/effect-for-state",
    label: "Misusing effect for state update",
    element: <EffectMissUse />,
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
