import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';

export const NavBarLayout = styled.nav`
display: flex;
justify-content: space-between;
position: static;
top: auto;
transition: none;
${(props) =>
    props.$navBarType === 'footer' &&
    `display: none;`
  }

@media ${device.tablet} {
  display: flex;
  top: 0;
  height: 80px;
  width: 100%;
  transition: top 0.4s;
  background-color: var(--white-color);
  border-bottom: 1px solid var(--color-blue-1);

  ${(props) =>
    props.$navBarType === 'header' &&
    `
    position: fixed;
    z-index: 1;
    top: ${props.$isvisible ? '0' : '-80px'};
    left: 0;
    `
  };
}`;

export const StyledSmallLogo = styled.div`
    padding-right: 8px;

    @media ${device.tablet} {
      padding-right: 32px;
    }
`;

export const AnchorLink = styled.a`
display: none;

&:hover {
    color: var(--color-brand-blue);
}
  @media ${device.tablet} {
    margin-right: 24px;
    text-decoration: none;
    line-height: 21.6px;
    color: var(--color-dark);
    display: block;
    font-size: 18px;
  }
`;

export const MainPageNavRight = styled.div`
display: flex;
align-items: center;
padding: 10px;

  @media ${device.tablet} {  
    padding: 18.5px 120px 18.5px 0;
  }
}
`;

export const MainPageNavLeft = styled.div`
display: flex;
padding: 10px;
width: 100%;

  @media ${device.tablet} {  
    padding: 16px 0 16px 120px;
    align-items: center;
  }
`;
