import { device } from '@/constants/mediaQueries';
import styled from 'styled-components';

export const MediumFilledButtonStyled = styled.button`
height: 36px;
padding: 8px 20px;
border-radius: 8px;
border: 1px solid var(--color-brand-blue);
color: var(--white-color);
font-family: "Roboto", sans-serif;
font-weight: 700;
line-height: 19.6px;
text-align: center;
font-size: 14px;
background-color: var(--color-brand-blue);
cursor: pointer;
white-space: nowrap;
  ${({ $mobilestyles }) => $mobilestyles};

&:hover {
    background-color: var(--color-blue-5);
}

@media ${device.tablet} {
  line-height: 19.6px;
  ${({ $desktopstyles }) => $desktopstyles};
  }
`
