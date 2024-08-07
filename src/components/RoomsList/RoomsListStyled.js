import styled from 'styled-components';
import SimpleBar from 'simplebar-react';
import { device } from '@/constants/mediaQueries';

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-height: 63vh;
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-9);
`;

export const ListItems = styled.ul`
  width: 248px;
  height: 562px;
  @media ${device.laptop} {
    min-width: 298px;
  }
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

export const ScrollBar = styled(SimpleBar)`
  max-height: 570px;
`;
