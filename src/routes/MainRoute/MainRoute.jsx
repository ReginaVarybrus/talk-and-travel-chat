import { useNavigate } from 'react-router-dom';

import {
  MainPageLayout,
  MainPageSectionOne,
  HeaderH1,
  Globe,
  Star,
  Telegram,
  TailTelegram,
  MainPageSectionTwo,
  MainPageSectionThree,
  SectionThreeContainer,
  MainPageSectionFour,
  BubbleContainer,
  SectionFourContainer,
  MainPageSectionFive,
  MainPageText,
} from '@/routes/MainRoute/MainRouteStyled';
import { generateUniqueKey } from '@/services/uniqKeyGen';
import GlobeIcon from '@/images/iconComponents/GlobeIcon';
import StarIcon from '@/images/iconComponents/StarIcon';
import TelegramIcon from '@/images/iconComponents/TelegramIcon';
import TailTelegramIcon from '@/images/iconComponents/TailTelegramIcon';
import Bubble from '@/components/Buttons/Bubble/Bubble';
import { routesPath } from '@/routes/routesConfig';
import LargeFilledButton from '@/components/Buttons/LargeFilled/LargeFilledButton';
import Miniature from '@/images/main_page_miniature.svg';
import NavBar from '@/components/NavigationBar/NavBar';
import LargeOutlinedButton from '@/components/Buttons/LargeOutlined/LargeOutlinedButton';
import Header from '@/components/HeaderMainPage/Header';

const bubbleData = [
  {
    marginbottom: '20px',
    $desktopstyles: 'left: 0%;',
    text: 'Meet friends and expand your network.',
  },
  {
    marginbottom: '40px',
    text: 'Save time by avoiding endless web searches.',
    $desktopstyles: 'right: calc(-100% + 568px);',
  },
  {
    marginbottom: '60px',
    $desktopstyles: 'left: 17%',
    text: 'Engage in lively discussions.',
  },
  {
    marginbottom: '60px',
    text: 'Access exclusive deals, insider tips.',
    $desktopstyles: 'right: calc(-88% + 464px)',
  },
  {
    marginbottom: '30px',
    text: 'Uncover hidden details and gain local insights.',
    $desktopstyles: 'left: 6%',
  },
  {
    marginbottom: '40px',
    text: 'Share your own experiences and insights.',
    $desktopstyles: 'right: calc(-100% + 528px)',
  },
  {
    marginbottom: '0',
    $desktopstyles: 'left: 0',
    text: 'Connect anytime, from your laptop or phone.',
  },
];

const MainRoute = () => {
  const navigate = useNavigate();
  const handleRegisterOpen = () => {
    navigate(routesPath.REGISTER);
  };

  return (
    <MainPageLayout>
      <Header />
      <MainPageSectionOne>
        <HeaderH1>
          <b>Talk</b> Without Borders
        </HeaderH1>
        <HeaderH1>
          <b>Travel</b> Without Limits
        </HeaderH1>
        <MainPageText
          $desktopstyles="margin: 24px 0 32px 0"
          $mobilestyles="margin: 15px 0 25px 0"
        >
          Start chatting now and be a <br /> part of the global conversation!
        </MainPageText>
        <LargeFilledButton
          $mobilestyles="
          font-size: 12px;
          line-height: 16px;"
          text="Start chatting"
          handleClick={handleRegisterOpen}
          $desktopstyles="
          font-size: 16px;"
        />
        <Globe>
          <GlobeIcon $fillColor="var(--color-blue-1)" />
        </Globe>
        <Star>
          <StarIcon $fillColor="var(--color-blue-1)" />
        </Star>
        <Telegram>
          <TelegramIcon $fillColor="var(--color-blue-1)" />
        </Telegram>
        <TailTelegram>
          <TailTelegramIcon $fillColor="var(--color-blue-1)" />
        </TailTelegram>
      </MainPageSectionOne>
      <MainPageSectionTwo>
        <img src={Miniature} alt="My Icon" />
      </MainPageSectionTwo>
      <MainPageSectionThree id="about">
        <SectionThreeContainer display="flex">
          <MainPageText
            $mobilestyles="
              color: var(--color-grey-13);
              margin-bottom: 10px;"
            $desktopstyles="
              color: var(--white-color);
              margin-bottom: 20px;
              font-size: 40px;
              line-height: 48px;
              "
          >
            What is <b>Talk & Travel?</b>
          </MainPageText>
          <MainPageText
            $mobilestyles="color: var(--color-grey-13);"
            $desktopstyles="color: var(--white-color);"
          >
            Talk & Travel is the chat where everyone joins a vibrant community,
            <br />
            connecting with fellow travelers to share tips, stories, and
            <br />
            experiences from around the world.
          </MainPageText>
          <MainPageText
            $mobilestyles="color: var(--color-grey-13);"
            $desktopstyles="color: var(--white-color);"
          >
            <br />
            Join specific countries or chat directly with your fellow explorers.
            <br />
            Sign up now and start enjoying the journey!
          </MainPageText>
          <LargeOutlinedButton
            $mobilestyles="
            line-height: 16px;
            font-size: 12px;
            color: var(--color-dark);
            background-color: var(--white-color);
            margin-top: 20px;
            "
            $desktopstyles="
            font-size: 16px;
            margin-top: 40px;
            "
            text="Get started"
            handleClick={handleRegisterOpen}
          />
        </SectionThreeContainer>
      </MainPageSectionThree>
      <MainPageSectionFour id="benefits">
        <SectionFourContainer>
          {bubbleData.map(bubble => (
            <Bubble
              key={`${generateUniqueKey()}`}
              $marginbottom={bubble.marginbottom}
              $desktopstyles={bubble.$desktopstyles}
              $text={bubble.text}
            />
          ))}
          <BubbleContainer>
            {bubbleData.map(bubble => (
              <MainPageText
                $mobilestyles="
                text-align: center;
                color: var(--white-color);"
                key={`${generateUniqueKey()}`}
              >
                {bubble.text}
              </MainPageText>
            ))}
          </BubbleContainer>
        </SectionFourContainer>
      </MainPageSectionFour>
      <MainPageSectionFive>
        <HeaderH1
          $mobilestyles="
            font-size: 26px;
            line-height: 22px;
          "
          $desktopstyles="
            font-weight: 600;
            font-size: 40px;
            line-height: 48px;
          "
        >
          Let’s get it started!
        </HeaderH1>
        <LargeFilledButton
          $mobilestyles="
          line-height: 16px;
          font-size: 12px;"
          $desktopstyles="
            font-size: 16px;"
          text="Register now"
          handleClick={handleRegisterOpen}
        />
      </MainPageSectionFive>
      <NavBar $navBarType="footer" />
    </MainPageLayout>
  );
};

export default MainRoute;
