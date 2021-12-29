import Navbar from '../../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const axios = require('axios').default;
import AuthContext from '../../context/AuthContext';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const token = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return router.push('/login');

      const res = await axios.get(`${process.env.API_URL}/api/users`, {
        headers: {
          'x-auth-token': token,
        },
      });

      setUser(res.data);
      console.log(res.data);
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      {user && (
        <div>
          <h1>Hey, {user.firstName}</h1>
          {user.isAdmin && <p>You are an admin!</p>}
        </div>
      )}
    </>
  );
}
