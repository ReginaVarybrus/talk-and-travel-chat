import { useNavigate } from 'react-router-dom';
import MainPageNavBar from '@/components/NavigationBar/MainPageNavBar';
import {
  MainPageLayout,
  MainPageSectionOne,
  SVGImage1,
  SVGImage2,
  SVGImage3,
  MainPageSectionTwo,
  MainPageSectionThree,
  SectionThreeContainer,
  MainPageSectionFour,
} from '@/routes/MainRoute/MainRouteStyled';
import { Typography } from '@mui/material';
import SVG1 from '@/images/icons/Vector Globe Icon.svg';
import SVG2 from '@/images/icons/Vector Star Icon.svg';
import SVG3 from '@/images/icons/Vector Telegram Icon.svg';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import Bubble from '@/components/Buttons/Bubble/Bubble';

const MainRoute = () => {
  const navigate = useNavigate();

  const handleRegisterOpen = () => {
    navigate('/register');
  };
  /*
  const handleLoginOpen = () => {
    navigate('/login');
  };
  */

  return (
    <MainPageLayout>
      <MainPageNavBar />
      <MainPageSectionOne>
        <Typography
          variant="h1"
          sx={{
            fontSize: '64px',
            lineHeight: '76.8px',
            color: 'var(--color-dark)',
          }}
        >
          <b>Talk</b> Without Borders
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: '64px',
            lineHeight: '76.8px',
            color: 'var(--color-dark)',
          }}
        >
          <b>Travel</b> Without Limits
        </Typography>
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
            margin: '32px',
          }}
          text="Start chatting"
          handleClick={handleRegisterOpen}
        />
        <SVGImage1 src={SVG1} alt="SVG1" />
        <SVGImage2 src={SVG2} alt="SVG2" />
        <SVGImage3 src={SVG3} alt="SVG3" />
      </MainPageSectionOne>
      <MainPageSectionTwo />
      <MainPageSectionThree>
        <SectionThreeContainer display="flex">
          <Typography
            variant="h4"
            sx={{
              marginBottom: '20px',
              fontSize: '40px',
              lineHeight: '48px',
            }}
          >
            What is Talk & Travel?
          </Typography>
          <Typography>
            Talk & Travel is the chat where everyone joins a vibrant community,
            connecting with fellow travelers to share tips, stories, and
            experiences from around the world.
          </Typography>
          <Typography>
            Join specific countries or chat directly with your fellow explorers.
            Sign up now and start enjoying the journey!
          </Typography>
          <BasicButton
            sx={{
              marginTop: '40px',
            }}
            variant="outlined"
            text="Get started"
            handleClick={handleRegisterOpen}
          />
        </SectionThreeContainer>
      </MainPageSectionThree>
      <MainPageSectionFour>
        <Bubble text="Meet friends and expand your network." />
      </MainPageSectionFour>
    </MainPageLayout>
  );
};

export default MainRoute;
