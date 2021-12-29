import Link from 'next/link';

export default function Hero() {
  const icon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-12 w-12'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
      />
    </svg>
  );

  return (
    <section className='p-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center'>
      <div className='flex justify-center items-center mb-6'>{icon}</div>
      <h1 className='text-4xl font-bold mb-6'>
        Get The{' '}
        <strong className='not-italic'>
          Best Laptop & PC&nbsp;Hardware Deals
        </strong>{' '}
        in South&nbsp;Africa
      </h1>
      <Link href='#'>
        <a className='bg-white px-6 py-2 text-black inline-block rounded shadow-lg'>
          Shop Now
        </a>
      </Link>
    </section>
  );
}
