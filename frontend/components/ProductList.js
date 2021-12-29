import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map((p) => (
          <ProductCard
            title={p.title}
            image={p.image}
            price={p.price}
            category={p.category.name}
          />
        ))}
      </div>
    </div>
  );
}
