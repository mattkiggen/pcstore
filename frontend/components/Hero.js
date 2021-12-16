import styled from 'styled-components';

export default function Hero() {
  return (
    <StyledSection>
      <h1>Buy PC Parts Online in South Africa</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
        placeat iusto illum fugit corporis sapiente ad incidunt necessitatibus,
        amet tenetur?
      </p>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  background-color: #f1f1f1;
  padding: 40px;
`;
