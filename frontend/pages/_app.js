import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Toaster position='top-center' />
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default MyApp;
