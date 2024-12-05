import styled from '@emotion/styled';

const Nav = styled.nav`
  background: #4a90e2;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 1rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Navigation = () => (
  <Nav>
    <h1 style={{ color: '#fff' }}>ClimaTrek</h1>
    <div>
      <Link href="#home">Home</Link>
      <Link href="#about">About</Link>
      <Link href="#contact">Contact</Link>
    </div>
  </Nav>
);

export default Navigation;
