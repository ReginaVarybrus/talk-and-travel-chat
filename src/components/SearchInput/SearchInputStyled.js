import styled from 'styled-components';

export const AutocompleteInputWrapper = styled.div`
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

export const IconSearch = styled.div`
  position: absolute;
  top: 8.5px;
  left: 16px;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  z-index: 1;
`;

export const ListWrapper = styled.div`
  position: absolute;
  top: 133px;
  left: -17px;
  width: 299.4px;
  height: 600px;
  margin-bottom: 48px;
  background: var(--white-color);
  border-left: 1px solid var(--color-grey-6);
  border-right: 1px solid var(--color-grey-6);
`;

export const ListItems = styled.ul`
  position: absolute;
  width: 299.4px;
  height: 562px;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 16px;
  background: var(--white-color);
  &:hover {
    background: var(--color-blue-1);
  }
`;

export const Flag = styled.img`
  width: 32px;
  height: 24px;
  padding-right: 12px;
`;
