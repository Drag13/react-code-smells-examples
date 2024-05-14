import { useEffect, useState } from 'react';
import styles from './props-drilling.module.css';
import { userInfo } from './userInfo';

export default function App() {
  const [userData, setUserData] = useState({
    loading: true,
    user: null,
    error: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        user: userInfo,
        loading: false,
        error: null,
      });
    }, 500);
  }, []);

  const { error, loading, user } = userData;

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>error</>;
  }

  return <Layout user={user} />;
}

function Layout({ user }) {
  return (
    <>
      <Navigation userName={user.name} />
      <Body operations={user.operations} userAge={user.age} />
      <Footer lastVisit={user.lastVisit} />
    </>
  );
}

function Navigation({ userName }) {
  return (
    <div className={`${styles.border} ${styles.nav}`}>
      Navigation block. <div>Hello {userName}</div>
    </div>
  );
}

function Body({ userAge, operations }) {
  const isAllowedToView = userAge >= 18;
  return (
    <div className={styles.border}>
      Main block:{' '}
      {isAllowedToView ? <Operations operations={operations} /> : 'Not Allowed'}
    </div>
  );
}

function Operations({ operations }) {
  const totalAmount = 1000;
  return (
    <>
      <ul>
        {operations.map(({ sign, value }, i) => (
          <li key={i}>
            {sign === '+' ? 'Gain' : 'Lost'} {value}
          </li>
        ))}
      </ul>

      Total: {totalAmount}
    </>
  );
}

function Footer({ lastVisit }) {
  return (
    <div className={styles.border}>
      Footer block: Last visited: {lastVisit.toLocaleDateString()}
    </div>
  );
}


