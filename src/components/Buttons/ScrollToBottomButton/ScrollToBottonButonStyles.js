import styled from 'styled-components';

export const ScrollButton = styled.button`
  position: fixed;
  bottom: 135px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-blue-2);
  color: white;
  border: none;
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  svg {
    width: 25px;
    height: 25px;
    color: var(--color-blue-4);
  }

  &:hover {
    background-color: var(--color-blue-1);
  }
`;
