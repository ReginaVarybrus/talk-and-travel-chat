import styled from 'styled-components';
import Miniature from '@/images/main_page_miniature.svg'
import { Box } from '@mui/material';
import { device } from '@/constants/mediaQueries';


export const MainPageLayout = styled(Box)`
box-sizing: border-box;
padding-top: 0px;

@media ${device.tablet} {
    padding-top: 80px;
}
`;

export const MainPageSectionOne = styled(Box)`
margin-top: 20px;
margin-bottom: 20px;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;

@media ${device.tablet} {
  margin-top: 180px;
  margin-bottom: 138px;
}
`;

export const HeaderH1 = styled.h1`
color: var(--color-dark);
font-size: 32px;
font-weight: 400;
line-height: 38.4px;
text-align: center;

@media ${device.tablet} {
  font-size: 64px;
  line-height: 76.8px;
}
`;


export const Globe = styled.div`
  position: absolute;
  bottom: 31%;
  left: 10%;
  z-index: -1;
`;

export const Star = styled.div`
  position: absolute;
  bottom: 21%;
  left: 50%;
  z-index: -1;
`;

export const Telegram = styled.div`
  position: absolute;
  bottom: 42%;
  right: 5%;
  z-index: -1;
`;

export const TailTelegram = styled.div`
  position: absolute;
  bottom: 26%;
  right: 7%;
  z-index: -1;
`;

export const MainPageSectionTwo = styled(Box)`
display: none;

@media ${device.tablet} {
  background-image: url(${Miniature});
  height: 100vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-bottom: 100px;
}
`;

export const MainPageSectionThree = styled.div`
`;

export const SectionThreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-brand-blue);
  padding: 100px 305px;
  margin: 0 120px;
  border-radius: 32px;
  color: var(--white-color);
  text-align: center;
`;

export const MainPageSectionFour = styled(Box)`
  padding: 100px 120px;
`;

export const SectionFourContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 700px;
`;

export const MainPageSectionFive = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 180px;
`;