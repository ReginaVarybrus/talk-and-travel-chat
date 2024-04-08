import styled from 'styled-components';

export const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: var(--white-color);
  position: relative;
`;

export const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 235px;
`;

export const Logo = styled.img`
  width: 240px;
  height: 200px;
  stroke: var(--color-brand-blue);
`;
