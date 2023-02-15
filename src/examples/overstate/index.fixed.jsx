import { useState } from "react";
import styles from "./index.module.css";

export default function App() {
  const [user, setUserData] = useState({
    firstName: "",
    secondName: "",
  });

  const { firstName, secondName } = user;

  function updateFirstName(e) {
    const { value } = e.target;
    setUserData({
      ...user,
      firstName: value,
    });
  }

  function updateSecondName(e) {
    const { value } = e.target;
    setUserData({
      ...user,
      secondName: value,
    });
  }

  const fullName = getFullName(firstName, secondName);

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

const getFullName = (fName, sName) =>
  `${fName}${fName && sName ? ", " : ""}${sName}`;
