import styled from 'styled-components';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <div>
      <h2>Products</h2>
      <StyledDiv>
        {products.map((p) => (
          <ProductCard
            title={p.title}
            image={p.image}
            price={p.price}
            category={p.category.name}
          />
        ))}
      </StyledDiv>
    </div>
  );
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
`;
