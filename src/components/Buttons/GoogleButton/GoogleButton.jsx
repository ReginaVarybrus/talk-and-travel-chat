import { useEffect } from 'react';
import {
  GoogleButton,
  GoogleLogoSVG,
} from '@/components/Buttons/GoogleButton/GoogleButton.styled';
import { useDispatch } from 'react-redux';
import { logInWithGoogle } from '@/redux-store/auth/authOperations';
/* global google */

const ButtonGoogle = () => {
  const dispatch = useDispatch();

  const handleCredentialResponse = response => {
    try {
      const jwtParts = response.credential.split('.');
      if (jwtParts.length !== 3) {
        throw new Error('Invalid JWT structure');
      }

      const decodeBase64Url = str =>
        decodeURIComponent(
          atob(str.replace(/-/g, '+').replace(/_/g, '/'))
            .split('')
            .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
        );

      const tokenData = JSON.parse(decodeBase64Url(jwtParts[1]));

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
        ux_mode: 'redirect',
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
