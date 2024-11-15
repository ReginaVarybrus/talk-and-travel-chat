import styled from 'styled-components';
import Button from '@mui/material/Button';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/material';
import { GrAttachment } from 'react-icons/gr';
import { FiSend } from 'react-icons/fi';

export const MessageBarStyled = styled.footer`
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  min-height: 112px;
  max-height: 444px;
  background: var(--white-color);
  border-top: 1px solid var(--color-grey-6);
  transition: height 0.3s ease;
`;

export const ButtonJoinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

export const MessageInputs = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 32px;
  position: relative;
`;

export const TextareaStyled = styled.div`
  display: flex;
  width: 100%;
  max-height: 200px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

export const TextareaAutosize = styled(BaseTextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  max-height: 200px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 13.2px 16px;
  color: var(--color-grey-8);
  border-radius: 8px;
  border: 1px solid var(--color-grey-6);
  resize: none;
  outline: none;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: var(--color-grey-7);
  }

  &:focus {
    border: 1px solid var(--color-grey-8);
    &::placeholder {
      color: transparent;
    }
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-5);
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    height: 144px;
    border-radius: 100px;
    background: var(--color-grey-9);
  }
`;

export const ButtonAttachFile = styled(Button)`
  &&& {
    min-width: 48px;
    height: 48px;
    background: var(--white-color);
    border: 1px solid var(--color-grey-6);
    border-radius: 8px;
    cursor: pointer;
    box-shadow: none;
    padding: 0;
  }
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

export const AttachmentIcon = styled(GrAttachment)`
  width: 24px;
  height: 24px;
  stroke: var(--color-grey-9);
`;

export const ButtonSendMessage = styled.button`
  min-width: 48px;
  height: 48px;
  background: var(--white-color);
  border-radius: 8px;
  cursor: pointer;
  border: ${({ $isMessageNotEmpty }) =>
    $isMessageNotEmpty
      ? '1px solid var(--color-brand-blue)'
      : '1px solid var(--color-grey-6)'};
`;

export const SendIcon = styled(FiSend)`
  width: 24px;
  height: 24px;
  stroke: var(--color-grey-9);
`;

export const MaxLimitPopup = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);

  background-color: var(--color-grey-2);
  color: var(--color-error);
  padding: 3px;
  font-size: 12px;
  text-align: center;
  border-radius: 4px;
  width: 220px;
  box-shadow:
    0px 2px 4px 2px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.1);
`;
