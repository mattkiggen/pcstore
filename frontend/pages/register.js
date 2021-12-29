import FormInput from '../components/FormInput';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import Button from '../components/Button';
import Link from 'next/link';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormInput
          label='Last Name:'
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormInput
          label='Email:'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label='Password:'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          label='Confirm Password:'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
