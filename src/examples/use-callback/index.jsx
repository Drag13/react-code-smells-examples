import { memo, useCallback, useState } from "react";
import styles from "./index.module.css";

export default function App() {
  const [c, setCounter] = useState(0);

  const uselessCallback = useCallback(() => console.log(1), []);

  const optimizedCallback = useCallback(() => setCounter((pv) => pv + 1), []);

  function defaultCallback() {
    setCounter((pv) => pv + 1);
  }

  return (
    <article className={styles.root}>
      <h1>Use callback is not a silver bullet</h1>

      <section>
        <h2>Regular functional component</h2>
        <RegularButton onClick={optimizedCallback}>
          Button as functional component
        </RegularButton>
      </section>

      <section>
        <h2>Optimized functional component</h2>
        <OptimizedButton onClick={optimizedCallback}>
          Button as functional component
        </OptimizedButton>
      </section>

      <section>
        <h2>Set of regular buttons</h2>
        <button onClick={defaultCallback}>1</button>
        <button onClick={defaultCallback}>2</button>
        <button onClick={defaultCallback}>3</button>
        <button onClick={defaultCallback}>4</button>
        <button onClick={defaultCallback}>5</button>
      </section>

      <div>clicked: {c} times</div>
    </article>
  );
}

function RegularButton({ children, onClick }) {
  console.log("Regular button renders");
  return (
    <button name="regular btn" onClick={onClick}>
      {children}
    </button>
  );
}

const OptimizedButton = memo(function OptimizedButton({ children, onClick }) {
  console.log("OptimizedButton button renders");
  return (
    <button name="optimized btn" onClick={onClick}>
      {children}
    </button>
  );
});
