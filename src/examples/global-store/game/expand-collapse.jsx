import { useSelector, useDispatch } from "react-redux";
import { toggleExpandedReducer } from "../global.store";

export function ExpandCollapse({ short, full, id }) {
  // CODE SMELL #4 USING GLOBAL STORE FOR LOCAL STATE
  const expanded = useSelector((x) => x.store.expanded[id]);
  const dispatch = useDispatch();
  const toggle = () => dispatch(toggleExpandedReducer(id));
  return (
    <div>
      {expanded ? (
        <p>{full}</p>
      ) : (
        <button type="button" onClick={toggle}>
          {short}
        </button>
      )}
    </div>
  );
}
