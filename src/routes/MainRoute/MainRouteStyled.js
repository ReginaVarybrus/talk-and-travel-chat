import styled from 'styled-components';
import SmallLogo from '@/images/small_logo.svg';
import Miniature from '@/images/main_page_miniature.svg'
import { Typography, Box } from '@mui/material';

export const MainPageLayout = styled(Box)`
box-sizing: border-box;
padding-top: 80px;
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

export const AnchorLink = styled.a`
text-decoration: none;
color: var(--color-dark);
`

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
export const MainPageSectionOne = styled.div`
margin-top: 180px;
margin-bottom: 138px;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
`
/*
export const MainPageTitle = styled(Typography)`
font-size: 64px;
font-weight: 400;
line-height: 76.8px;
margin-bottom: 24px;
`
*/

export const MainPageText = styled(Typography)`
font-size: 20px;
line-height: 24px;
text-align: center;
margin-bottom: 32px;
`

export const SVGImage1 = styled.img`
  position: absolute;
  bottom: 33%;
  left: 5%;
  z-index: -1;
`;

export const SVGImage2 = styled.img`
  position: absolute;
  bottom:15%;
  left: 50%;
  z-index: -1;
`;

export const SVGImage3 = styled.img`
  position: absolute;
  bottom: 40%;
  right: 5%;
  z-index: -1;
`;

export const MainPageSectionTwo = styled(Box)`
  background-image: url(${Miniature});
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-bottom: 100px;
`

export const MainPageSectionThree = styled(Box)`

`

export const SectionThreeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-brand-blue);
  padding: 100px 305px;
  margin: 0 120px;
  border-radius: 32px;
  color: var(--white-color);
  text-align: center;
`

export const MainPageSectionFour = styled(Box)`
margin: 100px 120px;
`
