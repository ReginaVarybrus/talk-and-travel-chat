import styled from 'styled-components';
import SmallLogo from '@/images/small_logo.svg';

export const MainPageLayout = styled.section`
box-sizing: border-box;
font-family: Roboto, sans-serif;
`

export const MainPageNav = styled.nav`
height: 80px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid var(--color-blue-1);
`

export const StyledSmallLogo = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${SmallLogo});
  background-repeat: no-repeat;
  background-size: contain;
  padding-right: 32px;
`;

export const MainPageNavRight = styled.div`
display: flex;
gap: 24px;
padding: 18.5px 120px 18.5px 0;
align-items: center
`

export const MainPageNavLeft = styled.div`
display: flex;
gap: 24px;
padding: 16px 0 16px 120px;
align-items: center
`
export const MainPageSectionTwo = styled.div`
margin-top: 180px;
display: flex;
flex-direction: column;
align-items: center;
`

export const MainPageTitle = styled.h1`
font-size: 64px;
font-weight: 400;
line-height: 76.8px;
text-align: center;
`
