const axios = require('axios').default;
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import toast from 'react-hot-toast';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useCookies } from 'react-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['x-auth-token']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.API_URL}/api/auth`, {
        email,
        password,
      });

      if (res.status === 200) {
        setCookie('x-auth-token', res.data.token, {
          path: '/',
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });

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
          <FormInput
            label='Email:'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
          <FormInput
            label='Password:'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <Button text='Login' />
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
