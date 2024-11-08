// import { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { getUsersStatuses } from '@/redux-store/selectors.js';
// import PropTypes from 'prop-types';

// const useUserActivity = (sendUpdateUserActivityEvent, userId) => {
//   const usersStatuses = useSelector(getUsersStatuses);
//   const userStatus = usersStatuses.find(user => user.userId === userId);
//   const isOffline = userStatus ? !userStatus.status.isOnline : true;
//   const hasSentOnlineEvent = useRef(false);

//   useEffect(() => {
//     const handleUpdateActivity = status => {
//       if (isOffline && !hasSentOnlineEvent.current) {
//         sendUpdateUserActivityEvent(status);
//         hasSentOnlineEvent.current = true;
//         console.log(' one of events sended');
//       }
//     };

//     const updateActivityEvents = [
//       'mousemove',
//       'keydown',
//       'mousedown',
//       'touchstart',
//     ];

//     updateActivityEvents.forEach(event =>
//       window.addEventListener(event, () => handleUpdateActivity(true))
//     );

//     document.addEventListener('visibilitychange', () => {
//       console.log('visibility state', document.visibilityState);
//       if (document.visibilityState === 'visible') {
//         handleUpdateActivity(true);
//       } else {
//         handleUpdateActivity(false);
//       }
//     });

//     return () => {
//       updateActivityEvents.forEach(event =>
//         window.removeEventListener(event, handleUpdateActivity)
//       );
//       document.removeEventListener('visibilitychange', handleUpdateActivity);
//     };
//   }, [sendUpdateUserActivityEvent, isOffline]);

//   useEffect(() => {
//     if (!isOffline) {
//       hasSentOnlineEvent.current = false;
//     }
//   }, [isOffline]);

//   return () => {};
// };

// useUserActivity.propTypes = {
//   sendUpdateUserActivityEvent: PropTypes.func,
// };

// export default useUserActivity;

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUsersStatuses } from '@/redux-store/selectors.js';
import PropTypes from 'prop-types';

const useUserActivity = (sendUpdateUserActivityEvent, userId) => {
  // Отримуємо всі статуси користувачів з Redux store
  const usersStatuses = useSelector(getUsersStatuses);

  // Знайдемо статус конкретного користувача
  const userStatus = usersStatuses.find(user => user.userId === userId);

  // Якщо статус користувача не знайдено, вважаємо, що він офлайн
  const isOffline = userStatus ? !userStatus.status.isOnline : true;

  // useRef для відслідковування того, чи була відправлена подія "online"
  const hasSentOnlineEvent = useRef(false);

  useEffect(() => {
    const handleUpdateActivity = status => {
      // Якщо користувач офлайн і подія не була відправлена
      if (isOffline && !hasSentOnlineEvent.current) {
        sendUpdateUserActivityEvent(status);
        hasSentOnlineEvent.current = true;
        console.log('One of events sent');
      }
    };

    // Перелік подій, які відслідковуються
    const updateActivityEvents = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
    ];

    // Додаємо обробники подій
    updateActivityEvents.forEach(event =>
      window.addEventListener(event, () => handleUpdateActivity(true))
    );

    // Обробка події "visibilitychange"
    document.addEventListener('visibilitychange', () => {
      console.log('Visibility state', document.visibilityState);
      if (document.visibilityState === 'visible') {
        handleUpdateActivity(true);
      } else {
        handleUpdateActivity(false);
      }
    });

    // Очистка подій при демонтажі компонента
    return () => {
      updateActivityEvents.forEach(event =>
        window.removeEventListener(event, () => handleUpdateActivity(true))
      );
      document.removeEventListener('visibilitychange', () =>
        handleUpdateActivity(true)
      );
    };
  }, [isOffline, sendUpdateUserActivityEvent]);

  useEffect(() => {
    // Якщо користувач онлайн, скидаємо стан
    if (!isOffline) {
      hasSentOnlineEvent.current = false;
    }
  }, [isOffline]);

  return () => {};
};

useUserActivity.propTypes = {
  sendUpdateUserActivityEvent: PropTypes.func,
};

export default useUserActivity;
