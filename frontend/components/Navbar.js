import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { href: '/', name: 'Home' },
    { href: '/', name: 'About' },
    { href: '/', name: 'Contact' },
  ];

  const icon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      viewBox='0 0 20 20'
      fill='currentColor'
      width={20}>
      <path
        fillRule='evenodd'
        d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
        clipRule='evenodd'
      />
    </svg>
  );

  const closeIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-5 w-5'
      viewBox='0 0 20 20'
      fill='currentColor'
      width={20}>
      <path
        fillRule='evenodd'
        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  );

  return (
    <StyledHeader>
      <StyledNav>
        <div>Logo</div>
        <StyledButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? closeIcon : icon}
        </StyledButton>
        <StyledList isOpen={isOpen}>
          {items.map((item) => (
            <StyledItem>
              <Link key={item.href} href={item.href}>
                <a>{item.name}</a>
              </Link>
            </StyledItem>
          ))}
        </StyledList>
      </StyledNav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 20px;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  color: #222;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (min-width: 640px) {
    display: none;
  }
`;

const StyledList = styled.ul`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 640px) {
    display: flex;
    width: auto;
    flex-direction: row;
  }
`;

const StyledItem = styled.li`
  margin-top: 20px;
  :first-child {
    margin-top: 40px;
  }

  @media (min-width: 640px) {
    margin-top: 0;
    :first-child {
      margin-top: 0;
    }
    margin-left: 20px;
  }
`;
