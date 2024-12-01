import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const SendedImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: 350px;
  object-fit: contain;
  margin: 0 auto;
  @media ${device.mobileM} {
    max-width: 263px;
  }
  @media ${device.tablet} {
    max-width: 416px;
  }
`;

export const LoaderStyleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
`;
