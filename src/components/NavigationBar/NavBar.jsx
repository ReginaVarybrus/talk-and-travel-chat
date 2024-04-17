import { useNavigate } from 'react-router-dom';

import {
  StyledSmallLogo,
  NavBarLayout,
  AnchorLink,
  MainPageNavRight,
  MainPageNavLeft,
} from '@/components/NavigationBar/MainPageNavBarStyled';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';

const NavBar = props => {
  const { type, isvisible } = props;

  const navigate = useNavigate();

  const handleRegisterOpen = () => {
    navigate('/register');
  };

  const handleLoginOpen = () => {
    navigate('/login');
  };

  return (
    <NavBarLayout type={type} isvisible={isvisible}>
      <MainPageNavLeft>
        <StyledSmallLogo />
        <AnchorLink href="#about">About chat</AnchorLink>
        <AnchorLink href="#benefits">Benefits</AnchorLink>
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
    </NavBarLayout>
  );
};

export default NavBar;
