import styled from 'styled-components';

export default function ProductCard({ title, image, price, category }) {
  return (
    <StyledDiv>
      <h3>{title}</h3>
      <img src={image} width={200} />
      <p>R {price}</p>
      <p>{category}</p>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
`;
