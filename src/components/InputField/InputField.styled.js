import styled from 'styled-components';

const getNotificationColor = ({ $isErrorColor, $isSuccessColor }) => {
  if ($isErrorColor) return 'var(--color-error)';
  if ($isSuccessColor) return 'var(--color-success)';
  return '#79747E';
};

const generalNotificationStyles = `
  margin-top: 10px;
  font-size: 12px;
  text-align: left;
`;

export const ItemWrapp = styled.div`
  margin-bottom: 15px;
`;

export const StyledLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${getNotificationColor};
`;

export const StyledInput = styled.input`
  width: 100%;
  color: #111;
  font-size: 14px;
  line-height: 18px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${getNotificationColor};
  background-color: var(--white-color);
  padding-left: 16px;

  &:hover {
    border: 1px solid #111;
  }

  &:placeholder {
    color: #49454f;
  }

  @media screen and (min-width: 768px) {
    width: 360px;
    background-color: var(--color-grey-4);
  }
`;

export const Error = styled.p`
  ${generalNotificationStyles}
  color: var(--color-error);
`;

export const Success = styled.p`
  ${generalNotificationStyles}
  color: var(--color-success);
`;

export const PasswordReapetLable = styled.p`
  ${generalNotificationStyles}
  padding-left: 14px;
  color: #49454f;
`;
