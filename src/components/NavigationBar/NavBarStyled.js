import styled from 'styled-components';
import { Box } from '@mui/material';
import SmallLogo from '@/images/small_logo.svg';

export const NavBarLayout = styled.nav`
  ${(props) =>
    props.$navBarType === 'header'
    && `
    position: fixed;
    z-index: 1;
    top: ${props.$isvisible ? '0' : '-80px'};
    left: 0;
  `};
  width: 100%;
  transition: top 0.4s;
  background-color: var(--white-color);
  height: 80px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-blue-1);
`;

export const StyledSmallLogo = styled(Box)`
  width: 48px;
  height: 48px;
  background-image: url(${SmallLogo});
  background-repeat: no-repeat;
  background-size: contain;
  padding-right: 32px;
`;

export const AnchorLink = styled.a`
  font-size: 18px;
  line-height: 21.6px;
  text-decoration: none;
  color: var(--color-dark);
`;

export const MainPageNavRight = styled.div`
  display: flex;
  gap: 24px;
  padding: 18.5px 120px 18.5px 0;
  align-items: center
`;

export const MainPageNavLeft = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 0 16px 120px;
  align-items: center
`;
