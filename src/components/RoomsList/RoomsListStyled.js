import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--color-grey-9);
`;

export const ListItems = styled.ul`
  width: 100vw;
  @media ${device.tablet} {
    width: 248px;
  }
  @media ${device.laptop} {
    width: 298px;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 5%;
  background: var(--white-color);
  &:hover {
    background: var(--color-blue-1);
  }
  @media ${device.tablet} {
    padding: 0 16px;
  }
`;

export const Flag = styled.img`
  width: 32px;
  height: 24px;
  padding-right: 12px;
`;
