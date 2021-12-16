import Head from 'next/head';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>Buy PC Parts Online in South Africa</title>
      </Head>
      <Navbar />
      <Hero />
    </>
  );
}
