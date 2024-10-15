import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoCloseOutline } from 'react-icons/io5';
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

export const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const CloseIcon = styled(IoCloseOutline)`
  width: 24px;
  height: 24px;
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

  p {
    word-break: break-all;
  }
`;

export const AboutUser = styled.div`
  display: flex;
  margin: 22px 0;
  p {
    line-height: 24px;
    letter-spacing: 0.5px;
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
