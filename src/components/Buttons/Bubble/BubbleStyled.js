import { device } from '@/constants/mediaQueries';
import styled from 'styled-components';

export const BubbleStyled = styled.div`
display: none;
font-size: 14px;
line-height: 24px;
border-radius: 8px;
gap: 5px;
border: 1px solid var(--color-brand-blue);
padding: 5px;
margin-bottom: ${props => props.$marginbottom};

@media ${device.tablet} {
  position: relative;
  ${({ $desktopstyles }) => $desktopstyles};
  border-radius: 107px;
  padding: 16px;
  font-size: 24px;
  line-height: 28.8px;
  display: flex;
  align-items: center;
  gap: 16px;
}
  
`;