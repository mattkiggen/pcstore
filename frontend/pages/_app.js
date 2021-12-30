import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';
import ShoppingCartContext from '../context/ShoppingCartContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CookiesProvider>
      <ShoppingCartContext.Provider value={{ cartItems, setCartItems }}>
        <Toaster position='top-center' />
        <Component {...pageProps} />
      </ShoppingCartContext.Provider>
    </CookiesProvider>
  );
}

export default MyApp;
