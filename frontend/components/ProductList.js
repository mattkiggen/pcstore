import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <section>
      <h2 className='text-xl my-6 text-center'>Latest Products</h2>
      <div className='grid gap-3 grid-cols-1 md:grid-cols-3 container mx-auto px-6'>
        {products.map((p) => (
          <ProductCard
            id={p.id}
            title={p.title}
            image={p.image}
            price={p.price}
          />
        ))}
      </div>
    </section>
  );
}
