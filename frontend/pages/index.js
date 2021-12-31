const axios = require('axios').default;
import Head from 'next/head';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

export default function Home({ products }) {
  return (
    <Layout>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>Buy PC Parts Online in South Africa</title>
      </Head>
      <Hero />
      <Container>
        <ProductList products={products} />
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get(`${process.env.API_URL}/api/products`);
  console.log(res.data);

  return {
    props: { products: res.data },
  };
}
