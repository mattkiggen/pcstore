const axios = require('axios').default;
import Head from 'next/head';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';

export default function Home({ products }) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>Buy PC Parts Online in South Africa</title>
      </Head>
      <Navbar />
      <Hero />
      <ProductList products={products} />
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.API_URL}/api/products`);
  console.log(res.data);

  return {
    props: { products: res.data },
  };
}
