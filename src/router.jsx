import { createHashRouter } from "react-router-dom";
import ExampleList from "./ExampleList";
import { Layout } from "./Layout";
import Overstate from "./examples/overstate";

const exampleList = [{ path: "/overstate", label: "Overstate" }];

export const router = createHashRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <ExampleList list={exampleList} />,
      },
      {
        path: exampleList[0].path,
        element: <Overstate />,
      },
    ],
  },
]);
