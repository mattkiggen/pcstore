import Navbar from '../components/Navbar';
import { useState } from 'react';
const axios = require('axios').default;
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:1337/api/auth`, {
      email,
      password,
    });

    if (res.status === 200) {
      localStorage.setItem('x-auth-token', res.data.token);
      return router.push('/dashboard');
    }
    console.log(res.status);
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-6'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className='flex flex-col'>
            <span>Email:</span>
            <input
              type='text'
              className='p-2 rounded shadow'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className='flex flex-col'>
            <span>Password:</span>
            <input
              type='password'
              className='p-2 rounded shadow'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className='px-6 py-3 bg-gray-400'>Login</button>
        </form>
      </div>
    </>
  );
}
