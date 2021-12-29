const axios = require('axios').default;
import FormInput from '../components/FormInput';
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import AuthContext from '../context/AuthContext';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const authToken = useContext(AuthContext);

  // Check if user is logged in
  useEffect(() => {
    if (authToken) {
      router.push('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstName,
        lastName,
        email,
        password,
      };
      const res = await axios.post(`${process.env.API_URL}/api/users`, data);
      const { token } = res.data;

      console.log(token);
      toast.success('Account created');
    } catch (err) {
      toast.error('Error creating new account');
    }
  };

  return (
    <>
      <Navbar />
      <h1>Create New Account</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='First Name:'
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value.trim())}
        />
        <FormInput
          label='Last Name:'
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value.trim())}
        />
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
        <FormInput
          label='Confirm Password:'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value.trim())}
        />
        <Button text='Register' />
        <p>
          Already have an account?{' '}
          <Link href='/login'>
            <a className='underline'>Login</a>
          </Link>
        </p>
      </form>
    </>
  );
}
