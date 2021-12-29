const axios = require('axios').default;
import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function ProductPage({ product }) {
  const stockCss = `${
    product.numberInStock > 0 ? 'bg-green-500' : 'bg-gray-500'
  }`;
  return (
    <>
      <Navbar />
      <main>
        <h1 className='text-3xl font-bold'>{product.title}</h1>
        <Image
          src={`${product.image}`}
          width={500}
          height={500}
          objectFit='contain'
        />
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </main>
      <aside>
        <div className={stockCss}>
          {product.numberInStock > 0 ? 'In stock' : 'Currently unavailable'}
        </div>
        {product.numberInStock > 0 && (
          <button className='bg-yellow-300 w-full p-2 rounded'>Buy Now</button>
        )}
      </aside>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${process.env.API_URL}/api/products/${id}`);

  return {
    props: { product: res.data },
  };
}
