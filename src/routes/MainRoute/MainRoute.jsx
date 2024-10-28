import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
  SectionFourContainer,
  MainPageSectionFive,
} from '@/routes/MainRoute/MainRouteStyled';
import { Typography } from '@mui/material';
import { generateUniqueKey } from '@/services/uniqKeyGen';
import GlobeIcon from '@/images/iconComponents/GlobeIcon';
import StarIcon from '@/images/iconComponents/StarIcon';
import TelegramIcon from '@/images/iconComponents/TelegramIcon';
import TailTelegramIcon from '@/images/iconComponents/TailTelegramIcon';

import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import Bubble from '@/components/Buttons/Bubble/Bubble';

import { routesPath } from '@/routes/routesConfig';

const bubbleData = [
  {
    marginbottom: '20px',
    left: '0%',
    text: 'Meet friends and expand your network.',
  },
  {
    marginbottom: '40px',
    left: '53%',
    text: 'Save time by avoiding endless web searches.',
  },
  {
    marginbottom: '60px',
    left: '17%',
    text: 'Engage in lively discussions.',
  },
  {
    marginbottom: '60px',
    left: '47%',
    text: 'Access exclusive deals, insider tips.',
  },
  {
    marginbottom: '30px',
    left: '12%',
    text: 'Uncover hidden details and gain local insights.',
  },
  {
    marginbottom: '40px',
    left: '55%',
    text: 'Share your own experiences and insights.',
  },
  {
    marginbottom: '0',
    left: '0',
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
        <Typography
          sx={{
            marginTop: '24px',
            fontSize: '20px',
            lineHeight: '24px',
          }}
        >
          Start chatting now and be a <br /> part of the global conversation!
        </Typography>
        <BasicButton
          variant="contained"
          color="primary"
          sx={{
            marginTop: '32px',
          }}
          text="Start chatting"
          handleClick={handleRegisterOpen}
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
      <MainPageSectionTwo />
      <MainPageSectionThree id="about">
        <SectionThreeContainer display="flex">
          <Typography
            variant="h4"
            sx={{
              marginBottom: '20px',
              fontSize: '40px',
              lineHeight: '48px',
              color: 'var(--white-color)',
            }}
          >
            What is <b>Talk & Travel?</b>
          </Typography>
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '24px',
              color: 'var(--white-color)',
            }}
          >
            Talk & Travel is the chat where everyone joins a vibrant community,
            connecting with fellow travelers to share tips, stories, and
            experiences from around the world.
          </Typography>
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '24px',
              color: 'var(--white-color)',
            }}
          >
            <br />
            Join specific countries or chat directly with your fellow explorers.
            Sign up now and start enjoying the journey!
          </Typography>
          <BasicButton
            sx={{ marginTop: '40px' }}
            variant="outlined"
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
              marginbottom={bubble.marginbottom}
              left={bubble.left}
              text={bubble.text}
            />
          ))}
        </SectionFourContainer>
      </MainPageSectionFour>
      <MainPageSectionFive>
        <Typography
          variant="h4"
          sx={{
            fontWeight: '600',
            marginBottom: '20px',
            fontSize: '40px',
            lineHeight: '48px',
          }}
        >
          Let’s get it started!
        </Typography>
        <BasicButton
          variant="contained"
          color="primary"
          sx={{
            marginTop: '32px',
          }}
          text="Register now"
          handleClick={handleRegisterOpen}
        />
      </MainPageSectionFive>
      <Footer />
    </MainPageLayout>
  );
};

export default MainRoute;
