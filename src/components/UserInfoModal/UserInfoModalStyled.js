import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { LuInfo } from 'react-icons/lu';
import { device } from '@/constants/mediaQueries';

export const ModalWindowStyled = styled(Modal)`
  display: grid;
  place-items: center;
`;

export const InfoModalStyled = styled(Box)`
  box-sizing: border-box;
  position: relative;
  width: 279px;
  padding: 32px;
  margin: auto;
  background: var(--white-color);
  border-radius: 16px;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.3);
  z-index: 1;
  @media ${device.mobileM} {
    width: 327px;
  }
  @media ${device.tablet} {
    width: 480px;
  }
`;

export const ConfirmModalStyled = styled(Box)`
  box-sizing: border-box;
  position: relative;
  width: 227px;
  padding: 24px;
  margin: auto;
  background: var(--white-color);
  border-radius: 16px;
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.3);
  z-index: 1;

  @media ${device.tablet} {
    width: 380px;
    padding: 32px;

    h5 {
      margin-bottom: 32px;
    }
  }

  h5 {
    text-align: center;
    margin-bottom: 24px;
  }
`;

export const InfoIcon = styled(LuInfo)`
  width: 60px;
  height: 24px;
  margin-right: 12px;
`;

export const UserContactInfoStyled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  h5 {
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    color: var(--color-grey-9);
  }
`;

export const ModalAvatar = styled.img`
  min-width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  @media ${device.tablet} {
    width: 100px;
    height: 100px;
  }
`;

export const LetterAvatarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 48px;
  height: 48px;
  border-radius: 8px;
  background: var(--color-grey-6);
  color: var(--white-color);
  font-weight: 600;
  font-size: 18px;
  @media ${device.tablet} {
    width: 100px;
    height: 100px;
    font-size: 36px;
  }
`;

export const UserInfo = styled.div`
  margin-left: 16px;
  max-width: 155px;
  user-select: text;

  @media ${device.mobileM} {
    max-width: 205px;
  }
  @media ${device.tablet} {
    max-width: 255px;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const AboutUser = styled.div`
  display: flex;
  margin: 22px 0;
  word-break: break-all;
  overflow-wrap: anywhere;
  p {
    line-height: 24px;
    letter-spacing: 0.5px;
    user-select: text;
  }
`;

export const ButtonBlock = styled.div`
  width: 106px;
  height: 36px;
  margin: 23px 54px 0;
  @media ${device.mobileM} {
    margin: 23px 79px 0;
  }
  @media ${device.tablet} {
    margin: 23px 155px 0;
  }
`;

export const ButtonLeave = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  background: var(--color-brand-blue);
  box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
  color: var(--white-color);
  width: 136px;
  height: 46px;
  border: none;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s;
  margin-top: 32px;
  &:hover,
  &:focus {
    background: var(--color-blue-5);
  }
`;

export const ConfirmBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 45px;

  button {
    border-radius: 8px;
    outline: none;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
    width: 95px;
    height: 40px;
    transition: all 0.3s;
  }
  .confirm {
    border: none;
    background: var(--color-brand-blue);
    color: var(--white-color);

    &:hover {
      background: var(--color-blue-5);
    }
  }
  .cancel {
    border: 1px solid #1976d2;
    color: var(--color-grey-8);
    background: var(--white-color);
    &:hover {
      background: var(--color-blue-1);
    }
  }
`;
