import { useEffect, useState } from 'react';

export default function App() {
  const [userData, setUserData] = useState({
    loading: true,
    user: null,
    error: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        user: { name: 'Vitalii', age: 19 },
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

  return <>{user.name}</>;
}
