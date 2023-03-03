import { memo, useCallback, useState, Profiler } from "react";
import styles from "./index.module.css";

export default function App() {
  const [c, setCounter] = useState(0);

  const uselessCallback = useCallback(function independentFunc() {
    console.log(1);
  }, []);

  const optimizedCallback = useCallback(function complexFunc() {
    setCounter((pv) => pv + 1);
  }, []);

  return (
    <article className={styles.root}>
      <h1>useCallback is not a silver bullet</h1>

      <section>
        <h3>Regular functional component</h3>
        <RegularButton onClick={optimizedCallback}>
          Button as functional component
        </RegularButton>
      </section>

      <section>
        <h3>Set of regular buttons</h3>
        <button onClick={optimizedCallback}>1</button>
        <button onClick={optimizedCallback}>2</button>
        <button onClick={optimizedCallback}>3</button>
        <button onClick={optimizedCallback}>4</button>
        <button onClick={optimizedCallback}>5</button>
      </section>

      <section>
        <h3>Optimized functional component</h3>

        <Profiler
          id="Optimized btn"
          onRender={(id, _, duration) => console.log(`${id}: ${duration}`)}
        >
          <OptimizedButton onClick={optimizedCallback}>
            Optimized functional component
          </OptimizedButton>
        </Profiler>
      </section>

      <p>clicked: {c} times</p>
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

const MAX = 3_000_000_000;
const OptimizedButton = memo(function OptimizedButtonComponent({
  children,
  onClick,
}) {
  let i = 0;
  while (i < MAX) {
    i++;
  }
  console.log("OptimizedButton button renders");
  return (
    <button name="optimized btn" onClick={onClick}>
      {children}
    </button>
  );
});
