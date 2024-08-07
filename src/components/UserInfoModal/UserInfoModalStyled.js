import styled from 'styled-components';
import Box from '@mui/material/Box';
import { IoCloseOutline } from 'react-icons/io5';
import { LuInfo } from 'react-icons/lu';
import { device } from '@/constants/mediaQueries';

export const InfoModal = styled(Box)`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 279px;
  padding: 32px;
  background: var(--white-color);
  border-radius: 16px;
  box-shadow: 24;
  @media ${device.mobileM} {
    width: 327px;
  }
  @media ${device.tablet} {
    width: 480px;
  }
`;

export const ButtonClose = styled(IoCloseOutline)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const InfoIcon = styled(LuInfo)`
  width: 60px;
  height: 24px;
  margin-right: 12px;
`;

export const UserContactInfo = styled.div`
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
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 8px;
  @media ${device.tablet} {
    width: 100px;
    height: 100px;
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
