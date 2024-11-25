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
    try {
      console.log('Google Credential Response:', response);
      const tokenData = JSON.parse(atob(response.credential.split('.')[1]));
      console.log('Parsed Token Data:', tokenData);

      if (!tokenData.email || !tokenData.name) {
        throw new Error('Missing email or name in token data');
      }

      if (!tokenData.email_verified) {
        console.error('Email is not verified');
        return;
      }

      dispatch(logInWithGoogle(tokenData));
    } catch (error) {
      console.error('Error parsing token data or dispatching login:', error);
    }
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
      google.accounts.id.prompt();
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
