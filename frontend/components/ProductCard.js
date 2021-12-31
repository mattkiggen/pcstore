import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import FormattedPrice from './FormattedPrice';
import ShoppingCartContext from '../context/ShoppingCartContext';
import Button from './Button';

export default function ProductCard({ product }) {
  const { setCartItems } = useContext(ShoppingCartContext);

  const handleBuyNow = () => {
    setCartItems((previousItems) => {
      // TODO: Need to check if product already in items, then increase quantity instead
      return [...previousItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <article className='border border-gray-200 flex flex-col justify-center items-center p-6 rounded'>
      <Link href={`/product/${product.id}`}>
        <a>
          <h3 className='text-xl mb-3 hover:underline'>{product.title}</h3>
        </a>
      </Link>
      <Image
        src={`${product.image}`}
        width={200}
        height={200}
        objectFit='contain'
      />
      <p className='text-2xl font-bold mb-6'>
        <FormattedPrice price={product.price} />
      </p>
      <Button
        text='Add to cart'
        className='bg-yellow-300 w-full p-2 rounded'
        onClick={handleBuyNow}
      />
    </article>
  );
}
