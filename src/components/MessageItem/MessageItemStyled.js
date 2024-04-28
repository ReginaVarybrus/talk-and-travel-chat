import styled from 'styled-components';
import Box from '@mui/material/Box';
import { IoCloseOutline } from 'react-icons/io5';
import { LuInfo } from 'react-icons/lu';

export const MessageItemStyled = styled.div`
  display: flex;
  align-items: end;
  margin: 24px 32px;
`;

export const MessageContent = styled.ul`
  display: flex;
  align-items: end;
  padding: 16px;
  border-radius: 8px;
  background: var(--color-blue-1);
`;

export const Text = styled.p`
  text-align: start;
  font-size: 16px;
  color: var(--color-dark);
`;

export const Time = styled.span`
  text-align: center;
  font-size: 12px;
  margin-left: 8px;
  color: var(--color-grey-9);
`;

export const UserInfoModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 416px;
  padding: 32px;
  background: var(--white-color);
  border-radius: 16px;
  box-shadow: 24;
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
  width: 100px;
  height: 100px;
  margin-right: 16px;
  border-radius: 8px;
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
  margin: 23px 155px 0;
`;
