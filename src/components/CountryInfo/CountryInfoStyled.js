import styled from 'styled-components';
import { Box } from '@mui/material';

export const BoxWrap = styled(Box)`
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

  @media screen and (min-width: 768px) {
    width: 416px;
    padding: 32px;
    gap: 32px;
  }
`;

export const CountryWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const ContactsWrap = styled.div`
  border-top: 1px solid rgb(222, 222, 222);
  border-bottom: 1px solid rgb(222, 222, 222);
  padding-top: 16px;
  padding-bottom: 16px;
  @media screen and (min-width: 768px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

export const ContactsList = styled.ul`
  height: 216px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: inset 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
  background: var(--color-grey-3);

  @media screen and (min-width: 768px) {
    height: 260px;
  }
`;

export const Flag = styled.img`
  width: 48px;
  height: 36px;
  padding: 6px 0;

  @media screen and (min-width: 768px) {
    width: 100px;
    height: 75px;
    padding: 12.5px 0;
  }
`;

export const CountryNameWrap = styled.div`
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
  @media screen and (min-width: 768px) {
    gap: 8px;

    h5 {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;

  img {
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  height: 44px;
  gap: 16px;
  padding: 4px 8px;

  position: relative;

  @media screen and (min-width: 768px) {
    height: 49px;
    padding: 8px;
  }

  &:hover {
    button {
      opacity: 1;
      visibility: visible;
    }
  }
`;
export const UserWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 209px;
  gap: 4px;

  h5 {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.1;
  }
  p {
    font-size: 14px;
    color: var(--color-grey-9);
  }

  @media screen and (min-width: 768px) {
    width: 278px;

    gap: 8px;

    h5 {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;
export const MessageBtn = styled.button`
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

  @media screen and (min-width: 768px) {
    right: 14px;
    top: 17px;
  }
`;

export const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
`;

export const ExitBtn = styled.button`
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

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;
