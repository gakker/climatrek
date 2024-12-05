import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background: #4a90e2;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
`;

const Footer = () => (
  <FooterContainer>
    <p>© {new Date().getFullYear()} ClimaTrek. All Rights Reserved.</p>
  </FooterContainer>
);

export default Footer;
