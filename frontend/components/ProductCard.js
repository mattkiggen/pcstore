import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import FormattedPrice from './FormattedPrice';
import ShoppingCartContext from '../context/ShoppingCartContext';

export default function ProductCard({ title, image, price, id }) {
  const { setCartItems } = useContext(ShoppingCartContext);

  const handleBuyNow = () => {
    const product = { id, title, image, price, quantity: 1 };

    setCartItems((previousItems) => {
      // TODO: Need to check if product already in items, then increase quantity instead
      return [...previousItems, product];
    });
  };

  return (
    <article className='border border-gray-200 flex flex-col justify-center items-center p-6 rounded'>
      <Link href={`/product/${id}`}>
        <a>
          <h3 className='text-xl mb-3 hover:underline'>{title}</h3>
        </a>
      </Link>
      <Image src={`${image}`} width={200} height={200} objectFit='contain' />
      <p className='text-2xl font-bold mb-6'>
        <FormattedPrice price={price} />
      </p>
      <button
        className='bg-yellow-300 w-full p-2 rounded'
        onClick={handleBuyNow}>
        Add to cart
      </button>
    </article>
  );
}
