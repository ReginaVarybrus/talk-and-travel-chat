import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const Avatar = styled.img`
  border-radius: 4px;
  width: ${({ $size }) => $size || '48px'};
  height: ${({ $size }) => $size || '48px'};
  object-fit: cover;

  @media ${device.tablet} {
    width: ${({ $sizeTablet }) => $sizeTablet || '100px'};
    height: ${({ $sizeTablet }) => $sizeTablet || '100px'};
  }
`;
