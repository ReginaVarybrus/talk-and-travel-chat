import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const LayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--outlet-background-color);
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 90px 1fr;
    background-color: var(--outlet-background-color);
  }
  @media ${device.laptop} {
    grid-template-columns: 120px 1fr;
  }
`;
