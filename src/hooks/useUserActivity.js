import { useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUsersStatuses } from '@/redux-store/selectors.js';
import PropTypes from 'prop-types';

const useUserActivity = (sendUpdateUserActivityEvent, userId) => {
  const usersStatuses = useSelector(getUsersStatuses);
  const userStatus = usersStatuses.find(user => user.userId === userId);
  const isOffline = userStatus ? !userStatus.status.isOnline : true;
  const activityTimeoutRef = useRef(null);

  const handleUpdateActivity = useCallback(
    status => {
      if (isOffline === status) {
        sendUpdateUserActivityEvent(status);
      }
    },
    [isOffline, sendUpdateUserActivityEvent]
  );

  const debouncedActivityHandler = useCallback(() => {
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    activityTimeoutRef.current = setTimeout(
      () => handleUpdateActivity(true),
      500
    );
  }, [handleUpdateActivity]);

  useEffect(() => {
    const updateActivityEvents = [
      'mousemove',
      'click',
      'scroll',
      'keydown',
      'mousedown',
      'touchstart',
    ];

    updateActivityEvents.forEach(event =>
      window.addEventListener(event, debouncedActivityHandler)
    );

    const visibilityChangeHandler = () => {
      if (document.visibilityState === 'visible') {
        handleUpdateActivity(true);
      } else {
        handleUpdateActivity(false);
      }
    };

    document.addEventListener('visibilitychange', visibilityChangeHandler);

    return () => {
      updateActivityEvents.forEach(event =>
        window.removeEventListener(event, debouncedActivityHandler)
      );
      document.removeEventListener('visibilitychange', visibilityChangeHandler);

      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, [debouncedActivityHandler, handleUpdateActivity]);

  return () => {};
};

useUserActivity.propTypes = {
  sendUpdateUserActivityEvent: PropTypes.func,
};

export default useUserActivity;
