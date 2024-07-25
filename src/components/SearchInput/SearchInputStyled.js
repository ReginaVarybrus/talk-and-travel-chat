import styled from 'styled-components';
import SimpleBar from 'simplebar-react';
import { device } from '@/constants/mediaQueries';
import { FiSearch } from 'react-icons/fi';

export const AutocompleteInputStyled = styled.div`
  position: relative;
  min-width: 100%;
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
  left: -16px;
  width: 248px;
  height: 600px;
  margin-bottom: 48px;
  background: var(--white-color);
  z-index: 10;
  @media ${device.laptop} {
    width: 298px;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 16px;
  background: var(--white-color);
  &:hover {
    background: var(--color-grey-3);
  }
`;

export const Flag = styled.img`
  width: 32px;
  height: 24px;
  padding-right: 12px;
`;

export const ScrollBar = styled(SimpleBar)`
  max-height: calc(100vh - 227px);
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-9);
  margin: 0 20px;
`;
