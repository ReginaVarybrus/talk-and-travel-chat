import {
  FacebookButton,
  FacebookLogoSVG,
} from '@/components/Buttons/FaceBook/FaceBookButton.styled';
import { useDispatch } from 'react-redux';
import { logInWithFacebook } from '@/redux-store/slices/AuthOperations';

/* global FB */

const ButtonFacebook = () => {
  const dispatch = useDispatch();

  const handleFacebookLogin = () => {
    console.log('Facebook login initiated');
    FB.login(
      response => {
        console.log('Facebook Response:', response);
        if (response.authResponse) {
          FB.api('/me', { fields: 'name,email' }, userData => {
            console.log('Facebook User Data:', userData);
            dispatch(logInWithFacebook(userData));
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return (
    <FacebookButton onClick={handleFacebookLogin}>
      <FacebookLogoSVG />
      <span>Facebook</span>
    </FacebookButton>
  );
};

export default ButtonFacebook;
