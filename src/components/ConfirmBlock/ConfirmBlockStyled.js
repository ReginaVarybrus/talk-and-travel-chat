import styled from 'styled-components';

export const ConfirmBlockStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 45px;
`;

export const Button = styled.button`
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
  width: 95px;
  height: 40px;
  transition: all 0.3s;
  cursor: pointer;

  border: ${({ $confirm }) =>
    $confirm ? 'none' : '1px solid var(--color-brand-blue)'};
  background: ${({ $confirm }) =>
    $confirm ? 'var(--color-brand-blue)' : 'var(--white-color)'};
  color: ${({ $confirm }) =>
    $confirm ? 'var(--white-color)' : 'var(--color-grey-8)'};

  &:hover {
    background: ${({ $confirm }) =>
      $confirm ? 'var(--color-blue-5)' : 'var(--color-blue-1)'};
  }
`;
