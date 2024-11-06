import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const useUserActivity = sendUpdateUserActivityEvent => {
  const isUserOffline = useRef(true);

  useEffect(() => {
    const handleUpdateActivity = status => {
      if (isUserOffline.current) {
        sendUpdateUserActivityEvent(status);
        isUserOffline.current = false;
      }
      // console.log('event sended');
    };

    const updateActivityEvents = [
      // 'mousemove',
      'keydown',
      // 'mousedown',
      // 'touchstart',
    ];

    updateActivityEvents.forEach(event =>
      window.addEventListener(event, handleUpdateActivity(true))
    );

    document.addEventListener('visibilitychange', () => {
      // console.log('visibility state', document.visibilityState);
      if (document.visibilityState === 'visible') {
        handleUpdateActivity(true);
      } else {
        handleUpdateActivity(false);
      }
    });

    return () => {
      updateActivityEvents.forEach(event =>
        window.removeEventListener(event, handleUpdateActivity)
      );
      document.removeEventListener('visibilitychange', handleUpdateActivity);
    };
  }, [sendUpdateUserActivityEvent, isUserOffline]);

  return () => {
    isUserOffline.current = true;
  };
};

useUserActivity.propTypes = {
  sendUpdateUserActivityEvent: PropTypes.func,
};

export default useUserActivity;
