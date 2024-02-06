import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Wrapper, RegisterButton, LoginButton } from './MainPageStyled';

const MainPage = () => {
  const navigate = useNavigate();

  const handleRegisterOpen = () => {
    navigate('/register');
  };

  const handleLoginOpen = () => {
    navigate('/login');
  };

  return (
    <Wrapper>
      <h2>MainPage</h2>
      <RegisterButton onClick={handleRegisterOpen}>Sign up</RegisterButton>
      <LoginButton onClick={handleLoginOpen}>Login</LoginButton>
    </Wrapper>
  );
};

export default MainPage;
