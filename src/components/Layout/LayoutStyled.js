import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;

 /* @media screen and (min-width: 768px) {
    padding: 24px 32px;
  }
  @media screen and (min-width: 1440px) {
    padding: 40px 32px;
  }

  @media screen and (min-width: 1440px) {
    margin-left: 289px;
  } */
`;

export const LogoBlock = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p {
    color: var(--color-dark);
  }
`;

export const Logo = styled.img`
  width: 240px;
  height: 200px;
  margin-bottom: 16px;
`;
