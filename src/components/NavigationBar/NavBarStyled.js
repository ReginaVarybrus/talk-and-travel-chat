import styled from 'styled-components';
import SmallLogo from '@/images/iconComponents/SmallLogo';

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

  @media (max-width: 768px) {
    position: static;
    top: auto;
    transition: none;
    height: 50px;
    width: 100%;
  }
`;

export const StyledSmallLogo = styled(SmallLogo).attrs((props) => ({
  width: props.width || '48px',
  height: props.height || '48px',
  fill: props.fillColor || 'currentColor',
}))`
  padding-right: 32px;

  @media (max-width: 768px) {
    padding-right: 8px;
    width: 15px;
    height: 15px;
  }
`;

export const AnchorLink = styled.a`
  font-size: 18px;
  line-height: 21.6px;
  text-decoration: none;
  color: var(--color-dark);

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 19.2px;
  }
`;

export const MainPageNavRight = styled.div`
  display: flex;
  gap: 24px;
  padding: 18.5px 120px 18.5px 0;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MainPageNavLeft = styled.div`
  display: flex;
  gap: 24px;
  padding: 16px 0 16px 120px;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 5px;
    width: 100%;
  }
`;
