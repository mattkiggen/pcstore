import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ title, image, price, id }) {
  return (
    <article className='border border-gray-200 flex flex-col justify-center items-center p-6 rounded'>
      <Link href={`/product/${id}`}>
        <a>
          <h3 className='text-xl mb-3 hover:underline'>{title}</h3>
        </a>
      </Link>
      <Image src={`${image}`} width={200} height={200} objectFit='contain' />
      <p className='text-2xl font-bold mb-6'>R{price}</p>
      <button className='bg-yellow-300 w-full p-2 rounded'>Buy Now</button>
    </article>
  );
}
