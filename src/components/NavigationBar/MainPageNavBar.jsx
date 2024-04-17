import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledSmallLogo,
  MainPageNav,
  AnchorLink,
  MainPageNavRight,
  MainPageNavLeft,
} from '@/components/NavigationBar/MainPageNavBarStyled';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';

const MainPageNavBar = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleRegisterOpen = () => {
    navigate('/register');
  };

  const handleLoginOpen = () => {
    navigate('/login');
  };

  return (
    <MainPageNav isvisible={isVisible}>
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
    </MainPageNav>
  );
};

export default MainPageNavBar;
