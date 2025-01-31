import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyEmail } from '@/redux-store/auth/authOperations';
import { routesPath } from '@/routes/routesConfig';
import Loader from '@/components/Loader/Loader';

const VerificationRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');

    if (token) {
      dispatch(verifyEmail(token))
        .unwrap()
        .then(() => {
          navigate(routesPath.ROOMS);
        })
        .catch(error => {
          console.error('Verification failed', error.message);
          navigate(routesPath.LOGIN);
        });
    } else {
      navigate(routesPath.LOGIN);
    }
  }, [dispatch, navigate, location]);

  return <Loader />;
};

export default VerificationRoute;
