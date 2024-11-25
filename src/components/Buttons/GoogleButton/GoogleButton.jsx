import { useEffect } from 'react';
import {
  GoogleButton,
  GoogleLogoSVG,
} from '@/components/Buttons/GoogleButton/GoogleButton.styled';
import { useDispatch } from 'react-redux';
import { logInWithGoogle } from '@/redux-store/slices/AuthOperations';

/* global google */

const ButtonGoogle = () => {
  const dispatch = useDispatch();

  const handleCredentialResponse = response => {
    const tokenData = JSON.parse(atob(response.credential.split('.')[1]));
    dispatch(logInWithGoogle(tokenData));
  };

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id:
          '853304957930-2cclc0tr0hs9l4m918bgoeg51t8ca5u5.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
    } else {
      console.error('Google API is not loaded');
    }
  }, []);

  const triggerGoogleSignIn = () => {
    if (window.google) {
      google.accounts.id.prompt(); // Показывает popup для авторизации
    } else {
      console.error('Google API is not loaded');
    }
  };

  return (
    <GoogleButton onClick={triggerGoogleSignIn}>
      <GoogleLogoSVG />
      <span>Google</span>
    </GoogleButton>
  );
};

export default ButtonGoogle;
