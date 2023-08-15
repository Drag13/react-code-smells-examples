import styles from "./Summary.module.css";

export function Summary({ title, points }) {
  return (
    <div className={styles.root}>
      <h1 className={styles.header}>{title}</h1>
      <ul className={styles.points}>
        {points.map((x) => (
          <li key={x.text}>{x.text}</li>
        ))}
      </ul>
    </div>
  );
}
