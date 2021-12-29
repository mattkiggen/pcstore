import Navbar from '../components/Navbar';
import { useState } from 'react';
const axios = require('axios').default;
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.API_URL}/api/auth`, {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem('x-auth-token', res.data.token);
        toast.success('Login was successful');
        setTimeout(() => {
          return router.push('/dashboard');
        }, 2000);
      }
    } catch (err) {
      toast.error('An error occured. Please try again');
    }
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-6'>
        <h1 className='text-3xl mb-6'>Login to Your Account</h1>
        <form onSubmit={handleSubmit}>
          <label className='flex flex-col mb-6'>
            <span>Email:</span>
            <input
              type='text'
              className='p-2 rounded border border-gray-200'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className='flex flex-col mb-8'>
            <span>Password:</span>
            <input
              type='password'
              className='p-2 rounded border border-gray-200'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className='px-6 py-2 bg-gray-800 rounded text-white mb-6'>
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link href='/register'>
            <a className='underline'>Register</a>
          </Link>
        </p>
      </div>
    </>
  );
}
