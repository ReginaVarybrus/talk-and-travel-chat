import styled from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';

import { TextareaAutosize } from '@mui/material';

const getNotificationColor = ({ $isErrorColor, $isSuccessColor }) => {
  if ($isErrorColor) return 'var(--color-error)';
  if ($isSuccessColor) return 'var(--color-success)';
  return 'var (--color-grey-5)';
};

const generalNotificationStyles = `
  font-size: 12px;
  text-align: left;
`;

export const InputFieldStyled = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 1px;
  transform: translateY(-50%);
  background: var(--white-color);
  padding: 0px 4px 0px 4px;
  margin: 0 12px;
  color: 'var(--color-grey-6)';
  font-size: 12px;
  line-height: 16px;
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: 18px;
  line-height: 21.6px;
  height: 56px;
  border-radius: 8px;
  outline: none;
  border: 1px solid;
  border-color: ${({ disabled }) =>
    disabled ? 'transparent' : getNotificationColor};
  background-color: var(--white-color);

  &:hover {
    border: 1px solid
      ${({ disabled }) => (disabled ? 'transparent' : 'var(--color-dark)')};
  }

  &::placeholder {
    color: 'var(--color-grey-6)';
  }
  padding-left: 16px;
  padding-right: ${({ type }) => (type === 'password' ? '48px' : '16px')};

  @media screen and (min-width: 768px) {
    background-color: ${({ $backgroundcolor }) =>
      $backgroundcolor || 'var(--color-grey-4)'};
  }
`;

export const StyledTextarea = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  resize: none;

  font-size: 18px;
  line-height: 21.6px;
  overflow: auto !important;
  height: 56px;
  border-radius: 8px;
  border: 1px solid;
  padding: 18px 16px;
  border-color: ${({ disabled }) =>
    disabled ? 'transparent' : getNotificationColor};

  &:hover {
    border: 1px solid
      ${({ disabled }) => (disabled ? 'transparent' : 'var(--color-dark)')};
  }

  &::placeholder {
    color: 'var(--color-grey-6)';
  }

  @media screen and (min-width: 768px) {
    background-color: ${({ $backgroundcolor }) =>
      $backgroundcolor || 'var(--color-grey-4)'};
  }
`;

export const ErrorStyled = styled.p`
  ${generalNotificationStyles}
  color: var(--color-error);
  position: absolute;
  top: 58px;
`;

export const SuccessStyled = styled.p`
  ${generalNotificationStyles}
  color: var(--color-success);
`;

export const SuccessIcon = styled(AiOutlineCheck)`
  width: 20px;
  height: 20px;
  color: var(--color-success);
  position: absolute;
  right: 50px;
  top: 18px;
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

export const PopupPassword = styled.div`
  position: absolute;
  top: 100%;
  left: 14px;
  background-color: var(--white-color);
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--color-grey-7);
  z-index: 1000;
  width: 300px;
  box-shadow:
    0px 2px 4px 2px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.1);
`;
