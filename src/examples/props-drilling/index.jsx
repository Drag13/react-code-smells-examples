import { useEffect, useState } from 'react';
import styles from './props-drilling.module.css';

export default function App() {
  const [userData, setUserData] = useState({
    loading: true,
    user: null,
    error: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        user: {
          name: 'Vitalii',
          age: 19,
          lastVisit: new Date('01/01/2024'),
          operations: [
            {
              value: 100,
              sign: '+',
            },
            {
              value: 200,
              sign: '+',
            },
            {
              value: 400,
              sign: '-',
            },
          ],
        },
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

  return <Layout user={user}></Layout>;
}

function Layout({ user }) {
  return (
    <>
      <Navigation user={user} />
      <Body user={user} />
      <Footer user={user} />
    </>
  );
}

function Navigation({ user }) {
  return (
    <div className={`${styles.border} ${styles.nav}`}>
      Navigation block. <div>Hello {user.name}</div>
    </div>
  );
}

function Body({ user }) {
  const isAllowedToView = user.age >= 18;
  return (
    <div className={styles.border}>
      Main block:{' '}
      {isAllowedToView ? (
        <Operations operations={user.operations} />
      ) : (
        'Not Allowed'
      )}
    </div>
  );
}

function Operations({ operations }) {
  return (
    <>
      <ul>
        {operations.map(({ sign, value }, i) => (
          <li key={i}>
            {sign === '+' ? 'Gain' : 'Lost'} {' '}
            {value}
          </li>
        ))}
      </ul>
    </>
  );
}

function Footer({ user }) {
  return (
    <div className={styles.border}>
      Footer block: Last visited: {user.lastVisit.toLocaleDateString()}
    </div>
  );
}
