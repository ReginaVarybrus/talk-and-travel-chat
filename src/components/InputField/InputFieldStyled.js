import styled from 'styled-components';

const getNotificationColor = ({ $isErrorColor, $isSuccessColor }) => {
  if ($isErrorColor) return 'var(--color-error)';
  if ($isSuccessColor) return 'var(--color-success)';
  return '#79747E';
};

const generalNotificationStyles = `
  font-size: 12px;
  text-align: left;
`;

export const InputFieldStyled = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 1px;
  transform: translateY(-50%);
  background: var(--white-color);
  margin: 0 12px;
  color: #49454F;
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${({ disabled }) => (disabled ? 'transparent' : getNotificationColor)};

  &:hover {
    border: 1px solid ${({ disabled }) => (disabled ? 'transparent' : '#111')};;
  }

  &::placeholder {
    color: #49454f;
  }
  padding-left: 16px;
  padding-right: ${({ type }) => (type === 'password' ? '48px' : '16px')};

  @media screen and (min-width: 768px) {
    background-color: ${({ backgroundColor }) => backgroundColor || 'var(--color-grey-4)'};
  }
`;

export const ErrorStyled = styled.p`
  ${generalNotificationStyles}
  color: var(--color-error);
`;

export const SuccessStyled = styled.p`
  ${generalNotificationStyles}
  color: var(--color-success);
`;

export const PasswordReapetLable = styled.p`
  ${generalNotificationStyles}
  padding-left: 14px;
  color: #49454f;
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 14px;
  top: 16px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: var(--color-grey-9);
    transition: all 0.3s;
  }

  &:hover {
    svg {
      color: var(--color-blue-3);
    }
  }
`;
