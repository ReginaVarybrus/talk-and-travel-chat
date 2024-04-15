import { useNavigate } from 'react-router-dom';
import {
  MainPageLayout,
  StyledSmallLogo,
  MainPageNav,
  MainPageNavRight,
  MainPageNavLeft,
  MainPageTitle,
  MainPageSectionTwo,
} from '@/routes/MainRoute/MainRouteStyled';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';

const MainRoute = () => {
  const navigate = useNavigate();

  const handleRegisterOpen = () => {
    navigate('/register');
  };

  const handleLoginOpen = () => {
    navigate('/login');
  };

  return (
    <MainPageLayout>
      <MainPageNav>
        <MainPageNavLeft>
          <StyledSmallLogo />
          <p>About chat</p>
          <p>Benefits</p>
        </MainPageNavLeft>
        <MainPageNavRight>
          <BasicButton
            variant="outlined"
            text="Log In"
            handleClick={handleLoginOpen}
          />
          <BasicButton
            variant="contained"
            color="primary"
            text="Get started — it’s free"
            handleClick={handleRegisterOpen}
          />
        </MainPageNavRight>
      </MainPageNav>
      <MainPageSectionTwo>
        <MainPageTitle>
          <b>Talk</b> Without Borders
        </MainPageTitle>
        <MainPageTitle>
          <b>Travel</b> Without Limits
        </MainPageTitle>
        <p>Start chatting now and be a part of the global conversation!</p>
        <BasicButton
          variant="contained"
          color="primary"
          text="Start chatting"
          handleClick={handleRegisterOpen}
        />
      </MainPageSectionTwo>
    </MainPageLayout>
  );
};

export default MainRoute;
