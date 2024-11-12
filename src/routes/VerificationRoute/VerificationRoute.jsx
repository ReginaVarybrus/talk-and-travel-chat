import { verifyEmail } from '@/redux-store/slices/AuthOperations';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { routesPath } from '../routesConfig';

const VerificationRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

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
  return <div>VerificationRoute</div>;
};

export default VerificationRoute;
