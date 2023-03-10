import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function App() {
  const defaultMatrix = Array.from({ length: 3 }).map(() =>
    Array.from({ length: 3 }).map((_) => ({ value: " " }))
  );

  const [matrix, updateMatrix] = useState(defaultMatrix);
  useUnmountLog("App");

  function setValueToMatrix(matrix, searchElement, value) {
    return matrix.map((r) =>
      r.map((c) => (c === searchElement ? { ...c, value } : c))
    );
  }

  const onCellClick = (cell) => {
    const newMatrix = setValueToMatrix(matrix, cell, "X");
    updateMatrix(newMatrix);
  };

  const Row = ({ row, onCellClick }) => (
    <div className={styles.row}>
      {row.map((c, i) => (
        <Cell cell={c} key={i} onCellClick={onCellClick} />
      ))}
    </div>
  );

  const Cell = ({ cell, onCellClick }) => {
    useUnmountLog("Cell");

    return (
      <button
        className={styles.cell}
        onClick={() => onCellClick(cell)}
        type="button"
      >
        {cell.value}
      </button>
    );
  };

  return (
    <article className={styles.matrix}>
      {matrix.map((r, i) => (
        <Row row={r} key={i} onCellClick={onCellClick} />
      ))}
    </article>
  );
}

function useUnmountLog(componentName) {
  return useEffect(
    () => () => console.log(`Component "${componentName}" unmounted`),
    []
  );
}

//   function createArray(height, width, value) {
//     return Array.from({ length: width }).map(() =>
//       Array.from({ length: size }).map((_) => ({ value }))
//     );
//   }
