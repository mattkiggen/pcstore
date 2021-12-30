import { useContext } from 'react';
import Navbar from '../components/Navbar';
import ShoppingCartContext from '../context/ShoppingCartContext';

export default function CartPage() {
  const { cartItems } = useContext(ShoppingCartContext);

  return (
    <>
      <Navbar />
      <div>
        {cartItems.map((item) => {
          return (
            <p>
              {item.id} - {item.title}
            </p>
          );
        })}
      </div>
    </>
  );
}
