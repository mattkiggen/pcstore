export default function FormattedPrice({ price }) {
  const p = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price);

  return <span>{p}</span>;
}
