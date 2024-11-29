import { device } from '@/constants/mediaQueries';
import styled from 'styled-components';

export const MediumOutlinedButtonStyled = styled.button`
  height: 36px;
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid var(--color-brand-blue);
  color: var(--color-grey-8);
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 19.6px;
  text-align: center;
  font-size: 14px;
  background-color: transparent;
  white-space: nowrap;
  ${({ $mobilestyles }) => $mobilestyles};

  &:hover {
    font-weight: 700;
    background-color: var(--color-blue-1);
  }

  @media ${device.tablet} {
    line-height: 19.6px;
    ${({ $desktopstyles }) => $desktopstyles};
  }
`;
