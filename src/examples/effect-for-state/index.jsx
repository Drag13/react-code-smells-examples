import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function App() {
  const [user, setUserData] = useState({
    firstName: "",
    // composed value in the state (see overstate)
    isFirstNameValid: false,
  });

  const { firstName, isFirstNameValid } = user;

  // using effect to watch data and synchronously update state
  useEffect(() => {
    const isValid = firstName.length > 3;
    setUserData({ ...user, isFirstNameValid: isValid });
  }, [firstName]);

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
