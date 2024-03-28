import styled from 'styled-components';
import Button from '@mui/material/Button';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/material';

export const MessageBar = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 32px;
`;

export const TextareaAutosize = styled(BaseTextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  max-height: 200px;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 13.2px 16px;
  border-radius: 8px;
  color: var(--color-grey-8);
  border: 1px solid var(--color-grey-6);
  resize: none;
  outline: none;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: var(--color-grey-7);
  }

  &:focus {
    border: 1px solid var(--color-grey-8);
    &::placeholder {
      color: transparent;
    }
  }
`;

export const ButtonAttachFile = styled(Button)`
  min-width: 48px;
  height: 48px;
  background: var(--white-color);
  border: 1px solid var(--color-grey-6);
  border-radius: 8px;
  cursor: pointer;
`;

export const VisuallyHiddenInput = styled.input`
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  whitespace: nowrap;
  width: 1;
`;

export const ButtonSendMessage = styled.input`
  min-width: 48px;
  height: 48px;
  background: var(--white-color);
  border-radius: 8px;
  cursor: pointer;
  border: ${props =>
    props.isInputNotEmpty
      ? '1px solid var(--color-brand-blue)'
      : '1px solid var(--color-grey-6)'};
`;
