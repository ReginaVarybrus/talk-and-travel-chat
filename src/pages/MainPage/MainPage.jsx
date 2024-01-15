import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  const handleRegisterOpen = () => {
    navigate('/register');
  };

  const handleLoginOpen = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>MainPage</h2>
      <button onClick={handleRegisterOpen}>
        Sign up
      </button>
      <button onClick={handleLoginOpen}>
        Login
      </button>
    </div>
  );
}

