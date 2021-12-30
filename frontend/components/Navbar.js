import { useState, useContext } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import ShoppingCartContext from '../context/ShoppingCartContext';
import ShoppingCartIcon from './ShoppingCartIcon';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(['x-auth-token']);
  const router = useRouter();
  const { cartItems, setCartItems } = useContext(ShoppingCartContext);

  const handleLogout = (e) => {
    removeCookie(['x-auth-token']);
    router.push('/');
  };

  const listCss = `w-full ${
    isOpen ? 'block' : 'hidden'
  } mt-6 sm:flex sm:w-auto sm:mt-0`;

  const itemCss = 'my-2 last:my-0 sm:my-0 sm:ml-4';

  return (
    <header className='p-6 bg-gray-800 text-white'>
      <nav className='flex flex-wrap justify-between container mx-auto'>
        <div>Logo</div>
        <div className='flex justify-center items-center'>
          <ShoppingCartIcon
            numOfItems={cartItems.length}
            spanCss='inline-block sm:hidden mr-6'
          />
          <button onClick={() => setIsOpen(!isOpen)} className='sm:hidden'>
            Menu
          </button>
        </div>
        <ul className={listCss}>
          <li className={itemCss}>
            <Link href='/'>
              <a className='hover:underline'>Home</a>
            </Link>
          </li>
          {cookie['x-auth-token'] === undefined && (
            <li className={itemCss}>
              <Link href='/login'>
                <a className='hover:underline'>Login</a>
              </Link>
            </li>
          )}
          {cookie['x-auth-token'] === undefined && (
            <li className={itemCss}>
              <Link href='/register'>
                <a className='hover:underline'>Register</a>
              </Link>
            </li>
          )}
          {cookie['x-auth-token'] !== undefined && (
            <li className={itemCss}>
              <Link href='/dashboard'>
                <a className='hover:underline'>Dashboard</a>
              </Link>
            </li>
          )}
          {cookie['x-auth-token'] !== undefined && (
            <li className={itemCss}>
              <button className='hover:underline' onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
          <li className={itemCss}>
            <ShoppingCartIcon
              numOfItems={cartItems.length}
              spanCss='hidden sm:block'
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
