import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { href: '/', name: 'Home' },
    { href: '/login', name: 'Login' },
    { href: '/register', name: 'Register' },
  ];

  const listCss = `w-full ${
    isOpen ? 'block' : 'hidden'
  } mt-6 sm:flex sm:w-auto sm:mt-0`;

  const icon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      viewBox='0 0 20 20'
      fill='currentColor'
      width={20}>
      <path
        fillRule='evenodd'
        d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
        clipRule='evenodd'
      />
    </svg>
  );

  const closeIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      viewBox='0 0 20 20'
      fill='currentColor'
      width={20}>
      <path
        fillRule='evenodd'
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  );

  return (
    <header className='p-6 bg-gray-800 text-white'>
      <nav className='flex flex-wrap justify-between container mx-auto'>
        <div>Logo</div>
        <button onClick={() => setIsOpen(!isOpen)} className='sm:hidden'>
          {isOpen ? closeIcon : icon}
        </button>
        <ul className={listCss}>
          {items.map((item) => (
            <li key={item.name} className='my-2 last:my-0 sm:my-0 sm:ml-4'>
              <Link href={item.href}>
                <a className='hover:underline'>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
