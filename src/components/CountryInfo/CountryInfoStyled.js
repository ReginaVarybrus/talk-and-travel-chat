import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';
import { Box } from '@mui/material';

export const BoxStyled = styled(Box)`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white-color);
  border-radius: 16px;
  box-shadow:
    0px 2px 6px 2px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  padding: 16px;
  width: 295px;

  @media ${device.tablet} {
    width: 416px;
    padding: 32px;
    gap: 32px;
  }
`;

export const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const ContactsBoxStyled = styled.div`
  border-top: 1px solid rgb(222, 222, 222);
  border-bottom: 1px solid rgb(222, 222, 222);
  padding-top: 16px;
  padding-bottom: 16px;
  @media ${device.tablet} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

export const ContactsList = styled.ul`
  height: 216px;
  overflow-y: overlay;
  border-radius: 8px;
  box-shadow: inset 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
  background: var(--color-grey-3);

  @media ${device.tablet} {
    height: 260px;
  }

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-6);
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    height: 144px;
    border-radius: 100px;
    background: var(--color-grey-9);
  }
`;

export const Flag = styled.img`
  width: 48px;
  height: 36px;
  padding: 6px 0;

  @media ${device.tablet} {
    width: 100px;
    height: 75px;
    padding: 12.5px 0;
  }
`;

export const InfoBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h5 {
    font-size: 16px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: var(--color-grey-9);
  }
  @media ${device.tablet} {
    gap: 8px;

    h5 {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

export const Avatar = styled.div`
  position: relative;
  width: 36px;
  height: 36px;

  @media ${device.tablet} {
    width: 48px;
    height: 48px;
  }
`;

export const ImgAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

export const LetterAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 18px;
  background: var(--color-grey-6);
  color: var(--white-color);

  @media ${device.tablet} {
    width: 48px;
    height: 48px;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  height: 52px;
  gap: 16px;
  padding: 4px 8px;
  position: relative;

  @media ${device.tablet} {
    height: 65px;
    padding: 8px;
  }

  &:hover {
    button {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const UserContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px;
  gap: 4px;

  h5 {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size: 14px;
    color: var(--color-grey-9);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media ${device.tablet} {
    width: 200px;
    gap: 8px;

    h5 {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

export const SendMessageBtn = styled.button`
  opacity: 0;
  visibility: hidden;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    width: 20px;
    height: 21px;
    fill: var(--color-grey-9);
    transition: all 0.3s ease;
  }

  &:hover svg {
    fill: var(--color-blue-3);
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 9px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    stroke: var(--color-grey-9);
    width: 27px;
    height: 27px;
    transition: stroke 0.3s;
  }

  &:hover {
    svg {
      stroke: var(--color-blue-3);
    }
  }

  @media ${device.tablet} {
    right: 14px;
    top: 17px;
  }
`;

export const ButtonsBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
`;

export const ExitOrJoinBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-grey-9);

  svg {
    width: 20px;
    height: 20px;
    stroke: var(--color-grey-9);
  }
`;

export const ReportBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-error);

  svg {
    width: 20px;
    height: 20px;
    stroke: var(--color-error);
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  padding: 20px 0;
  font-size: 12px;
  font-weight: 700;

  @media ${device.tablet} {
    font-size: 16px;
  }
`;
