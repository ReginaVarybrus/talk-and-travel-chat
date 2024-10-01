import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import Button from '@mui/material/Button';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/material';

export const ChatStyled = styled.div`
  display: ${({ $isChatVisible }) => ($isChatVisible ? 'flex' : 'none')};
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: var(--white-color);
  position: relative;
  overflow: hidden;
  @media ${device.tablet} {
    display: flex;
  }
`;

export const NoMassegesNotification = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Logo = styled.img`
  width: 200px;
  height: 160px;
  margin-bottom: 20px;
  stroke: var(--color-brand-blue);
`;

export const MessageBlock = styled.div`
  // display: flex;
  // flex-direction: column-reverse;
  flex: 1;
  overflow-y: auto;
  width: 100%;
  background: var(--color-grey-3);
  transition: height 0.3s ease;
`;

export const MessageBarWrapper = styled.footer`
  width: 100%;
  min-height: 112px;
  max-height: 444px;
  background: var(--white-color);
  border-top: 1px solid var(--color-grey-6);
  width: 100%;
  transition: height 0.3s ease;
`;

export const MessageBar = styled.div`
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

export const ButtonSendMessage = styled.button`
  min-width: 48px;
  height: 48px;
  background: var(--white-color);
  border-radius: 8px;
  cursor: pointer;
  border: ${props =>
    props.$isInputNotEmpty
      ? '1px solid var(--color-brand-blue)'
      : '1px solid var(--color-grey-6)'};
`;

export const NewMessagesNotification = styled.div`
  position: absolute;
  bottom: 130px;
  font-size: 12px;
  background-color: var(--color-blue-5);
  color: var(--white-color);
  padding: 4px 8px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  justify-content: center;

  button {
    border: none;
    background-color: transparent;
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    svg {
      color: var(--white-color);
      width: 16px;
      height: 16px;
      transition: color 0.3s;
    }

    &:hover svg {
      color: var(--color-blue-3);
    }
  }
  .divider {
    width: 1px;
    height: 16px;
    background-color: var(--color-blue-2);
  }
`;
