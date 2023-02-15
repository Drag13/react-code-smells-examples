import { useState } from "react";
import styles from "./index.module.css";

export default function App() {
  const [user, setUserData] = useState({
    firstName: "",
    secondName: "",
    fullName: "",
  });

  const { firstName, secondName, fullName } = user;

  function updateFirstName(e) {
    const { value } = e.target;
    setUserData({
      ...user,
      firstName: value,
      fullName: `${value}, ${secondName}`,
    });
  }

  function updateSecondName(e) {
    const { value } = e.target;
    setUserData({
      ...user,
      secondName: value,
      fullName: `${firstName}, ${value}`,
    });
  }

  return (
    <form className={styles.root}>
      <h1>User</h1>

      <label>
        First name
        <input type="text" value={firstName} onChange={updateFirstName} />
      </label>

      <label>
        Second name
        <input type="text" value={secondName} onChange={updateSecondName} />
      </label>

      <p>Full name: {fullName || "?"}</p>
    </form>
  );
}
