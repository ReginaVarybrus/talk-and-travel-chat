import styled from 'styled-components';
import SimpleBar from 'simplebar-react';
import { device } from '@/constants/mediaQueries';
import { FiSearch } from 'react-icons/fi';

export const AutocompleteInputStyled = styled.div`
  position: relative;
  min-width: 90%;
  @media ${device.tablet} {
    min-width: 100%;
  }
`;

export const AutocompleteInput = styled.input`
  box-sizing: border-box;
  min-width: 100%;
  height: 35px;
  margin-bottom: 25px;
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

export const ListItemsStyled = styled.div`
  position: absolute;
  top: 130px;
  left: -5.5%;
  width: 111%;
  height: calc(100vh - 279px);
  margin-bottom: 48px;
  background: var(--white-color);
  z-index: 10;
  @media ${device.tablet} {
    left: -16px;
    width: 248px;
    height: calc(100vh - 229px);
  }
  @media ${device.laptop} {
    width: 298px;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 5%;
  background: var(--white-color);
  cursor: pointer;

  &:hover {
    background: var(--color-blue-1);
  }
  @media ${device.tablet} {
    padding: 0 16px;
  }

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
    color: var(--color-grey-9);
    font-size: 12px;
  }
`;

export const Flag = styled.img`
  margin-right: 12px;
  max-height: 36px;
`;

export const ScrollBar = styled(SimpleBar)`
  max-height: calc(100vh - 279px);
  @media ${device.tablet} {
    max-height: calc(100vh - 229px);
  }
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-9);
  margin: 0 20px;
`;

export const NameAndCountStyleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-size: 16px;
    margin-right: 12px;
    line-height: 1;
  }
`;
