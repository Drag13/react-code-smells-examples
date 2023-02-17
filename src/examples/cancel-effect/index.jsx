import { useState, useEffect } from "react";
import style from "./index.module.css";
const basePath = import.meta.env.VITE_API_BASE_PATH;

const tabs = ["Dead orcs", "User Data"];

export default function App() {
  const [tabName, setActiveTabName] = useState(tabs[0]);
  const setActiveTab = (e) => setActiveTabName(e.target.value);

  return (
    <>
      <h1>Zombie process</h1>
      <ul className={style.tab}>
        {tabs.map((x) => (
          <label key={x}>
            {x}
            <input
              type="radio"
              value={x}
              checked={x === tabName}
              onChange={setActiveTab}
            />
          </label>
        ))}
      </ul>

      {tabName === tabs[0] ? <FirstTab /> : null}
      {tabName === tabs[1] ? <SecondTab /> : null}
    </>
  );
}

const FirstTab = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log("I am working");
      setCounter((v) => v + 1);
    }, 1000);
  }, []);

  return <>Dead orcs: {counter}</>;
};

const SecondTab = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    function fetchData() {
      console.log("start loading user data");
      fetch(`${basePath}/user/default`)
        .then((x) => x.json())
        .then((u) => {
          console.log("saving user to state");
          setUser(u);
        });
    }

    fetchData();
  }, []);

  return <>Second tab. {user ? `Hello ${user.name}` : `loading`}</>;
};
