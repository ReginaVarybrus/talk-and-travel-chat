import styled from 'styled-components';
import { Box } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { LuInfo } from 'react-icons/lu';
import { device } from '@/constants/mediaQueries';

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
  width: 395px;

  @media ${device.tablet} {
    width: 466px;
    padding: 32px;
  }
`;

export const AvatarInList = styled.div`
  width: 36px;
  height: 36px;
  background: var(--color-grey-6);

  img {
    width: 100%;
    height: 100%;
  }

  @media ${device.tablet} {
    width: 48px;
    height: 48px;
  }
`;

export const AvatarInUserBlock = styled.div`
  width: 48px;
  height: 48px;
  background: var(--color-grey-6);
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
  }

  @media ${device.tablet} {
    width: 100px;
    height: 100px;
  }
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
export const LetterAvatarInUserBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  font-weight: 600;
  font-size: 18px;
  background: var(--color-grey-6);
  color: var(--white-color);
  border-radius: 8px;

  @media ${device.tablet} {
    width: 100px;
    height: 100px;
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
export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const UsersList = styled.ul`
  height: 250px;
  overflow-y: overlay;
  border-radius: 8px;
  box-shadow: inset 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
  background: var(--color-grey-3);
  padding: 8px 12px;

  @media ${device.tablet} {
    height: 325px;
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

export const MainBoxStyled = styled.div`
  border-top: 1px solid rgb(222, 222, 222);
  border-bottom: 1px solid rgb(222, 222, 222);
  padding-top: 16px;
  padding-bottom: 16px;

  @media ${device.tablet} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: row;
  width: 140px;
  gap: 8px;
  align-items: center;

  h5 {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.1;
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
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19.2px;
  letter-spacing: -0.28px;
  width: 106px;
  height: 46px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: var(--color-brand-blue);
  box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
  cursor: pointer;
  color: var(--white-color);

  &:hover {
    background: var(--color-blue-5);
  }

  &:focus {
    background: var(--color-blue-5);
  }

  @media ${device.tablet} {
    font-size: 16px;
    line-height: 19.2px;
    letter-spacing: -0.36px;
  }
`;

export const SearchInput = styled.input`
  box-sizing: border-box;
  min-width: 100%;
  height: 35px;

  padding: 1px 10px 0 40px;
  border: 1px solid var(--color-grey-7);
  border-radius: 4px;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: var(--color-grey-7);
    margin-top: 20px;
  }
  &:focus {
    outline: none;
    border: 1px solid var(--color-grey-8);
    &::placeholder {
      color: transparent;
    }
  }
`;

export const IconSearch = styled(FiSearch)`
  position: absolute;
  top: 8.5px;
  left: 16px;
  width: 16px;
  height: 16px;
  stroke: var(--color-grey-9);
`;

export const SearchBox = styled.div`
  position: relative;
`;

export const Subtitle = styled.h5`
  text-align: center;
  padding: 20px 0;
  font-size: 12px;
  font-weight: 700;

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export const Title = styled.h3`
  text-align: center;
  padding-top: 15px;
`;

export const UserInfoBox = styled.div`
  height: 250px;
  border-radius: 8px;
  box-shadow: inset 0px 1px 5px 0px rgba(0, 0, 0, 0.05);
  background: var(--color-grey-3);
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${device.tablet} {
    height: 325px;
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

export const InfoIcon = styled(LuInfo)`
  width: 60px;
  height: 24px;
  margin-right: 12px;
`;

export const MoreInfoBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  width: 85px;
  height: 30px;
  border: 1px solid var(--color-brand-blue);
  border-radius: 8px;
  outline: none;
  background: var(--white-color);
  cursor: pointer;
  color: var(--color-grey-8);

  &:hover {
    background: var(--color-blue-1);
  }
`;

export const UserContact = styled.div`
  display: flex;
  align-items: center;
  gap h5 {
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    color: var(--color-grey-9);
  }
`;

export const UserInfo = styled.div`
  margin-left: 16px;

  p {
    word-break: break-all;
  }
`;

export const ButtonBack = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 35px;
  height: 35px;

  svg {
    width: 30px;
    height: 30px;
    color: var(--color-grey-9);
    transition: all 0.3s;
  }

  &:hover svg {
    color: var(--color-blue-5);
  }
`;