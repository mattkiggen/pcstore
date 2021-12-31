const axios = require('axios').default;
import FormInput from '../components/FormInput';
import { useState } from 'react';
import Button from '../components/Button';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Container from '../components/Container';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cookie, setCookie] = useCookies(['x-auth-token']);
  const router = useRouter();

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
      setCookie('x-auth-token', res.data.token, {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });

      toast.success('Account created');
      setTimeout(() => {
        return router.push('/dashboard');
      }, 2000);
    } catch (err) {
      toast.error('Error creating new account');
    }
  };

  return (
    <Layout>
      <Container>
        <Heading text='Create New Account' />
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
      </Container>
    </Layout>
  );
}
