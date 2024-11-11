import { device } from '@/constants/mediaQueries';
import styled from 'styled-components';

export const LargeFilledButtonStyled = styled.button`
padding: 12px 24px;
border-radius: 8px;
border: 1px solid var(--color-brand-blue);
color: var(--white-color);
font-weight: 700;
line-height: 19.2px;
text-align: center;
font-size: 16px;
background-color: var(--color-brand-blue);
cursor: pointer;
white-space: nowrap;

${({ $mobilestyles }) => $mobilestyles};

&:hover {
    background-color: var(--color-blue-5);
}

@media ${device.tablet} {
  ${({ $desktopstyles }) => $desktopstyles};
}
`
