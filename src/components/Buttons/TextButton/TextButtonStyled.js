import { device } from '@/constants/mediaQueries';
import styled from 'styled-components';

export const TextButtonStyled = styled.label`
padding: 8px 16px;
border-radius: 8px;
border: none;
background-color: transparent;
cursor: pointer;
font-size: 14px;
font-weight: 400;
line-height: 19.6px;
text-align: center;
color: var(--color-brand-blue);
white-space: nowrap;
${({ $mobilestyles }) => $mobilestyles};

&:hover {
    font-weight: 700;
}

@media ${device.tablet} {
  ${({ $desktopstyles }) => $desktopstyles};
}
`;