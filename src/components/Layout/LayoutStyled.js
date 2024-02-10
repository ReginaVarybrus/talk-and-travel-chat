import styled from 'styled-components';

export const LayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  background-color: var(--outlet-background-color);
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
