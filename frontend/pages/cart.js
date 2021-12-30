import { useContext } from 'react';
import Navbar from '../components/Navbar';
import ShoppingCartContext from '../context/ShoppingCartContext';
import FormattedPrice from '../components/FormattedPrice';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems } = useContext(ShoppingCartContext);
  let total = 0;

  return (
    <>
      <Navbar />
      <h1>Your Cart</h1>
      <div className='flex flex-col items-center'>
        {cartItems.map((item) => {
          const price = parseFloat(item.price);
          total += parseFloat(price);
          return (
            <div className='grid grid-cols-1 sm:grid-cols-5'>
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                objectFit='contain'
              />
              <h3>{item.title}</h3>
              <p>{item.quantity}</p>
              <p>
                <FormattedPrice price={price * item.quantity} />
              </p>
              <p>Delete</p>
            </div>
          );
        })}
        <p>
          Total: <FormattedPrice price={total} />
        </p>
      </div>
    </>
  );
}
