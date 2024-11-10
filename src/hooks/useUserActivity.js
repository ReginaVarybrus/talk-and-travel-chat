import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUsersStatuses } from '@/redux-store/selectors.js';
import PropTypes from 'prop-types';

const useUserActivity = (sendUpdateUserActivityEvent, userId) => {
  const usersStatuses = useSelector(getUsersStatuses);
  const userStatus = usersStatuses.find(user => user.userId === userId);
  const isOffline = userStatus ? !userStatus.status.isOnline : true;

  const handleUpdateActivity = useCallback(() => {
    if (isOffline) {
      sendUpdateUserActivityEvent();
      console.log('User is now online, event sent');
    }
  }, [isOffline, sendUpdateUserActivityEvent]);

  useEffect(() => {
    const updateActivityEvents = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
    ];

    updateActivityEvents.forEach(event =>
      window.addEventListener(event, handleUpdateActivity)
    );

    const visibilityChangeHandler = () => {
      console.log('Visibility state', document.visibilityState);
      if (document.visibilityState === 'visible') {
        handleUpdateActivity();
      }
    };

    document.addEventListener('visibilitychange', visibilityChangeHandler);

    return () => {
      updateActivityEvents.forEach(event =>
        window.removeEventListener(event, handleUpdateActivity)
      );
      document.removeEventListener('visibilitychange', visibilityChangeHandler);
    };
  }, [handleUpdateActivity]);

  return () => {};
};

useUserActivity.propTypes = {
  sendUpdateUserActivityEvent: PropTypes.func,
};

export default useUserActivity;

// const useUserActivity = (sendUpdateUserActivityEvent, userId) => {
//   const usersStatuses = useSelector(getUsersStatuses);
//   const userStatus = usersStatuses.find(user => user.userId === userId);
//   const isOffline = userStatus ? !userStatus.status.isOnline : true;
//   const activityTimeoutRef = useRef(null); // таймер для обмеження

//   const handleUpdateActivity = useCallback(() => {
//     if (isOffline) {
//       sendUpdateUserActivityEvent();
//       console.log('User is now online, event sent');
//     }
//   }, [isOffline, sendUpdateUserActivityEvent]);

//   const debouncedActivityHandler = useCallback(() => {
//     // скидаємо попередній таймер, якщо він ще активний
//     if (activityTimeoutRef.current) {
//       clearTimeout(activityTimeoutRef.current);
//     }
//     // запускаємо новий таймер на 1 секунду
//     activityTimeoutRef.current = setTimeout(handleUpdateActivity, 1000);
//   }, [handleUpdateActivity]);

//   useEffect(() => {
//     const updateActivityEvents = [
//       'mousemove',
//       'keydown',
//       'mousedown',
//       'touchstart',
//     ];

//     // Використовуємо debouncedActivityHandler для обмеження частоти подій
//     updateActivityEvents.forEach(event =>
//       window.addEventListener(event, debouncedActivityHandler)
//     );

//     const visibilityChangeHandler = () => {
//       console.log('Visibility state', document.visibilityState);
//       if (document.visibilityState === 'visible') {
//         handleUpdateActivity();
//       }
//     };

//     document.addEventListener('visibilitychange', visibilityChangeHandler);

//     return () => {
//       updateActivityEvents.forEach(event =>
//         window.removeEventListener(event, debouncedActivityHandler)
//       );
//       document.removeEventListener('visibilitychange', visibilityChangeHandler);
//       // очищаємо таймер, якщо компонент демонтується
//       if (activityTimeoutRef.current) {
//         clearTimeout(activityTimeoutRef.current);
//       }
//     };
//   }, [debouncedActivityHandler, handleUpdateActivity]);

//   return () => {};
// };

// useUserActivity.propTypes = {
//   sendUpdateUserActivityEvent: PropTypes.func,
// };

// export default useUserActivity;
