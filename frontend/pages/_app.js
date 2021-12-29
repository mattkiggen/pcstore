import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('x-auth-token');
  }

  return (
    <AuthContext.Provider value={token}>
      <Toaster position='top-center' />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
