import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <section>
      <h2 className='text-xl text-center mb-6'>Latest Products</h2>
      <div className='grid gap-3 grid-cols-1 md:grid-cols-3'>
        {products.map((p) => (
          <ProductCard product={p} />
        ))}
      </div>
    </section>
  );
}
