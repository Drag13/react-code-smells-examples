import { useEffect, useState } from "react";
import { MATRIX_HEIGHT, MATRIX_WIDTH } from "./settings";
import { createMatrix, setValueToMatrix } from "./matrix";
import styles from "./index.module.css";

const defaultMatrix = createMatrix(MATRIX_WIDTH, MATRIX_HEIGHT, " ");

export default function App() {
  const [matrix, updateMatrix] = useState(defaultMatrix);
  useUnmountLog("App");

  const onCellClick = (cell) => {
    const newMatrix = setValueToMatrix(matrix, cell, "X");
    updateMatrix(newMatrix);
  };

  return (
    <article className={styles.matrix}>
      {matrix.map((r, i) => (
        <Row row={r} key={i} onCellClick={onCellClick} />
      ))}
    </article>
  );
}

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

function useUnmountLog(componentName) {
  return useEffect(
    () => () => console.log(`Component "${componentName}" unmounted`),
    []
  );
}
