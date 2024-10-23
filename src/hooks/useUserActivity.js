import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const useUserActivity = sendUpdateUserActivityEvent => {
  const isUserOffline = useRef(false);

  useEffect(() => {
    console.log('User is active');
    const handleUpdateActivity = () => {
      if (isUserOffline.current) {
        sendUpdateUserActivityEvent();
        isUserOffline.current = false;
      }
    };

    const updateActivityEvents = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
    ];

    updateActivityEvents.forEach(event =>
      window.addEventListener(event, handleUpdateActivity)
    );

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        handleUpdateActivity();
      }
    });

    return () => {
      updateActivityEvents.forEach(event =>
        window.removeEventListener(event, handleUpdateActivity)
      );
      document.removeEventListener('visibilitychange', handleUpdateActivity);
    };
  }, [sendUpdateUserActivityEvent]);

  return () => {
    isUserOffline.current = true;
  };
};

export default useUserActivity;

useUserActivity.propTypes = {
  sendUpdateUserActivityEvent: PropTypes.func,
};
