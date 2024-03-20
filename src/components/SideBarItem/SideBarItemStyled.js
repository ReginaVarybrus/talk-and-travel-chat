import styled from 'styled-components';

export const Text = styled.p`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.011em;
`;

export const SideBarButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 56px;
  height: 76px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-brand-blue)' : 'var(--color-grey-9)'};
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '400')};
  &:hover {
    svg {
      fill: var(--color-blue-3);
    }
    ${Text} {
      color: var(--color-blue-3);
    }
  }
  &:active {
    ${Text} {
      color: var(--color-brand-blue);
      font-weight: 700;
    }
  }
`;

export const SideBarIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
`;
