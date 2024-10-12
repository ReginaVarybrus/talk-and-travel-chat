import styled from 'styled-components';

export const ChatFistLoadingStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: var(--white-color);
  z-index: 10;
`;

export const Logo = styled.img`
  width: 240px;
  height: 200px;
  margin-bottom: 16px;
  stroke: var(--color-brand-blue);
`;

export const Text = styled.p`
  text-align: center;
`;
