import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const SeparatorBoxStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
  color: var(--color-grey-9);
  @media ${device.tablet} {
    margin: 24px 0;
  }
`;

export const Line1 = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: var(--color-grey-6);
  margin: 0 16px 0 24px;
  @media ${device.tablet} {
    margin: 0 16px 0 32px;
  }
`;

export const Line2 = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: var(--color-grey-6);
  margin: 0 24px 0 16px;
  @media ${device.tablet} {
    margin: 0 16px 0 32px;
  }
`;

export const DateText = styled.span`
  white-space: nowrap;
  font-size: 14px;
`;
