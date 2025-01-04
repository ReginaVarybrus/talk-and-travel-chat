import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux-store/auth/authOperations';
import { clearUser } from '@/redux-store/user/userSlice';
import { forceLogOut } from '@/redux-store/auth/authSlice';

const useSessionTimeout = token => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    try {
      const { exp } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeRemaining = exp - currentTime;

      // for test:
      // const timeRemaining = 30;

      if (timeRemaining <= 0) {
        Swal.fire({
          html: `
            <p>Your session has expired. Please log in again.</p>
            <button style="
              margin-top: 35px;
              background-color: #256ad2;
              color: #ffffff;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
            " onclick="window.location.href='/login'">
              Go to Login
            </button>
          `,
          icon: 'warning',
          showConfirmButton: false,
        });
        dispatch(forceLogOut());
        localStorage.removeItem('token');

        return;
      }

      const timeoutId = setTimeout(() => {
        Swal.fire({
          html: `
            <p>Your session has expired. Please log in again.</p>
       <button style="
              margin-top: 35px;
              background-color: #256ad2;
              color: #ffffff;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              box-shadow: 4px 2px 16px 0px rgba(136, 165, 191, 0.48);
            " onclick="window.location.href='/login'">
              Go to Login
            </button>
          `,
          icon: 'warning',
          showConfirmButton: false,
        });
        dispatch(logOut());
        localStorage.removeItem('token');
      }, timeRemaining * 1000);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error('Error decoding token:', error);
      dispatch(forceLogOut());
      localStorage.removeItem('token');
    }
  }, [token, dispatch]);
};

export default useSessionTimeout;
