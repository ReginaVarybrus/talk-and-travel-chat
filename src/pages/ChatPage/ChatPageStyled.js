import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;

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

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: var(--white-color);
`;

export const Logo = styled.img`
  width: 240px;
  height: 200px;
  margin-bottom: 16px;
`;
