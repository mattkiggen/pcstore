export default function ProductCard({ title, image, price, category }) {
  return (
    <div>
      <h3>{title}</h3>
      <img src={`${process.env.API_URL}${image}`} width={200} />
      <p>R {price}</p>
      <p>{category}</p>
    </div>
  );
}
