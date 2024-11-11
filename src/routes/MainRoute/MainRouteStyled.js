import styled from 'styled-components';
import { device } from '@/constants/mediaQueries';


export const MainPageLayout = styled.div`
box-sizing: border-box;
padding-top: 0px;

@media ${device.tablet} {
    padding-top: 80px;
}
`;

export const MainPageSectionOne = styled.section`
position: relative;
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
  ${({ $mobilestyles }) => $mobilestyles};


@media ${device.tablet} {
  font-size: 64px;
  line-height: 76.8px;
      ${({ $desktopstyles }) => $desktopstyles};
}
`;

export const MainPageText = styled.p`
font-size: 14px;
  ${({ $mobilestyles }) => $mobilestyles};
  
@media ${device.tablet} {
  font-size: 20px;
  line-height: 24px;
  text-align: center;
    ${({ $desktopstyles }) => $desktopstyles};
}
`


export const Globe = styled.div`
display: none;

@media ${device.tablet} {
  display: block;
  position: absolute;
  bottom: -20%;
  left: 13%;
  z-index: -1;
}
`;

export const Star = styled.div`
display: none;

@media ${device.tablet} {
  display: block;
  position: absolute;
  bottom: -56%;
  left: 50%;
  z-index: -1;
}
`;

export const Telegram = styled.div`
display: none;

@media ${device.tablet} {
  display: block;
  position: absolute;
  bottom: 15%;
  right: 16%;
  z-index: -1;
}
`;

export const TailTelegram = styled.div`
display: none;

@media ${device.tablet} {
  display: block;
  position: absolute;
  bottom: -34%;
  right: 18%;
  z-index: -1;
}
`;

export const MainPageSectionTwo = styled.section`
display: none;
padding: 0 93px 0 46px;
flex-direction: column;
margin: 0 120px;

@media ${device.tablet} {
  display: flex;
  margin-bottom: 100px;
}
`;

export const MainPageSectionThree = styled.section`
`;

export const SectionThreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  padding: 20px 0;
  align-items: center;
  border-radius: 8px;
  background-color: var(--color-grey-4);
  color: var(--color-grey-13);
  text-align: center;

  @media ${device.tablet} {
    color: var(--white-color);
    background-color: var(--color-brand-blue);
    border-radius: 32px;
    padding: 100px 0;
    margin: 0 120px;
  }
`;

export const MainPageSectionFour = styled.section`

@media ${device.tablet} {
  gap: 5px;
  display: flex;
  padding: 100px 120px;
}
`;

export const SectionFourContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


export const BubbleContainer = styled.div`
display: flex;
flex-direction: column;
margin: 20px;
padding: 20px;
align-items: center;
border-radius: 8px;
background-color: var(--color-brand-blue);
font-size: 14px;
line-height: 24px;


@media ${device.tablet} {
  display: none;
}
`

export const MainPageSectionFive = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  
@media ${device.tablet} {
  padding-top: 100px;
  padding-bottom: 180px;
  gap: 32px;
}
`;