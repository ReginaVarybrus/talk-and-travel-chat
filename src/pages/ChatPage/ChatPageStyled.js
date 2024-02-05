import styled from 'styled-components';

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  margin: 0 auto;
  background: var(--white-color);

  @media screen and (min-width: 375px) {
    max-width: 375px;
  }
  @media screen and (min-width: 768px) {
    max-width: 1440px;
  }
  @media screen and (min-width: 1440px) {
    max-width: 1920px;
  }
`;

export const LogoBlock = styled.div`
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
