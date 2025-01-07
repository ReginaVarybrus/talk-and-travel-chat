import Swal from 'sweetalert2';
import {
  GoogleButton,
  GoogleLogoSVG,
} from '@/components/Buttons/GoogleButton/GoogleButton.styled';
import { useDispatch } from 'react-redux';
import { logInWithGoogle } from '@/redux-store/auth/authOperations';
/* global google */

const ButtonGoogle = () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'email profile',
      callback: response => {
        if (response.access_token) {
          fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`
          )
            .then(res => res.json())
            .then(userInfo => {
              const { email, name, email_verified: emailVerified } = userInfo;

              if (!emailVerified) {
                Swal.fire({
                  text: 'Email is not verified. Please use a verified Google account.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
                return;
              }

              dispatch(logInWithGoogle({ email, name }));
            })
            .catch(err => {
              console.error('Failed to fetch user info:', err);
              Swal.fire({
                text: 'Failed to login with Google. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            });
        } else {
          Swal.fire({
            text: 'Failed to login with Google. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
    });

    client.requestAccessToken();
  };

  return (
    <GoogleButton type="button" onClick={handleGoogleSignIn}>
      <GoogleLogoSVG />
      <span>Google</span>
    </GoogleButton>
  );
};

export default ButtonGoogle;
