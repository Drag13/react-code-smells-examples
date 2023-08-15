import { useState } from "react";
import styles from "./index.module.css";

export default function App() {
  const [user, setUserData] = useState({
    firstName: "",
  });

  const { firstName } = user;
  const isFirstNameValid = firstName.length > 3;

  function updateFirstName(e) {
    const { value } = e.target;
    setUserData({
      ...user,
      firstName: value,
    });
  }

  return (
    <form className={styles.root}>
      <h1>User</h1>

      <label>
        First name
        <input
          className={isFirstNameValid ? "" : styles.invalid}
          type="text"
          value={firstName}
          onChange={updateFirstName}
        />
      </label>
    </form>
  );
}
