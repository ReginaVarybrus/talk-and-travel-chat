import { device } from '@/constants/mediaQueries';
import styled from 'styled-components';

export const LargeOutlinedButtonStyled = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid var(--color-brand-blue);
  color: var(--color-grey-8);
  font-size: 16px;
  background-color: transparent;
  white-space: nowrap;
  ${({ $mobilestyles }) => $mobilestyles};

  &:hover {
    background-color: var(--color-blue-1);
  }

  @media ${device.tablet} {
    line-height: 19.2px;
    ${({ $desktopstyles }) => $desktopstyles};
  }
`;
