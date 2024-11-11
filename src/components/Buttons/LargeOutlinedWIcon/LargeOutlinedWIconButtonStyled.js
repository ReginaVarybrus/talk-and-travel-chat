import { device } from '@/constants/mediaQueries';
import styled from 'styled-components';

export const LargeOutlinedWIconButtonStyled = styled.button`
width: 148px;
height: 44px;
padding: 12px 24px;
border-radius: 8px;
border: 1px solid var(--color-brand-blue);
color: var(--color-grey-8);
font-weight: 700;
line-height: 19.6px;
text-align: center;
font-size: 14px;
background-color: transparent;
cursor: pointer;
white-space: nowrap;
    ${({ $mobilestyles }) => $mobilestyles};

&:hover {
    background-color: var(--color-blue-1);
}

@media ${device.tablet} {
  ${({ $desktopstyles }) => $desktopstyles};
}

`
