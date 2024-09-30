import { useRef, useEffect } from 'react';
import { useStompClient } from 'react-stomp-hooks';
// import { useSelector } from 'react-redux';
// import { getUser } from '@/redux-store/selectors.js';
// import ULRs from '@/constants/constants';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const messagesSubscription = useRef(null);
  const isSubscribedToErrors = useRef(false);
  // const isSubscribedToUsersStatuses = useRef(false);
  // const userId = useSelector(getUser)?.id;

  const subscribeToMessages = (endpoint, setCountryData) => {
    if (stompClient && stompClient.connected && !messagesSubscription.current) {
      const subscription = stompClient.subscribe(endpoint, response => {
        const receivedMessage = JSON.parse(response.body);

        setCountryData(prevChatData => {
          const updatedMessages = [
            ...(prevChatData.messages || []),
            receivedMessage,
          ];
          return {
            ...prevChatData,
            messages: updatedMessages,
          };
        });
      });
      messagesSubscription.current = subscription;
      return subscription;
    }
  };

  const unsubscribeFromMessages = () => {
    const subscription = messagesSubscription.current;

    if (stompClient && stompClient.connected && subscription) {
      subscription.unsubscribe();
      messagesSubscription.current = null;
    }
  };

  const subscribeToUserErrors = (endpoint, setCountryData) => {
    if (stompClient && stompClient.connected && !isSubscribedToErrors.current) {
      stompClient.subscribe(endpoint, response => {
        const receivedError = JSON.parse(response.body);
        setCountryData(prevCountryData => {
          const updatedError = [
            ...(prevCountryData.events || []),
            receivedError,
          ];
          return {
            ...prevCountryData,
            events: updatedError,
          };
        });
      });
      isSubscribedToErrors.current = true;
    }
  };

  const subscribeToUsersStatuses = endpoint => {
    if (stompClient && stompClient.connected) {
      stompClient.subscribe(endpoint, response => {
        const receivedStatuses = JSON.parse(response.body);
        console.log('received online statuses', receivedStatuses);
      });
      // isSubscribedToUsersStatuses.current = true;
    }
  };

  const sendMessage = message => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/chat/messages`,
        body: JSON.stringify(message),
      });
    } else {
      console.error(
        'MESSAGE.Stomp client is not connected or no current room.'
      );
    }
  };

  const sendEvent = (message, endpoint) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: endpoint,
        body: JSON.stringify(message),
      });
    } else {
      console.error('EVENT.Stomp client is not connected or no current room.');
    }
  };

  // const handleOnlineStatus = isOnline => {
  //   const dataOnlineStatus = { userId, isOnline };
  //   sendEvent(dataOnlineStatus, ULRs.updateOnlineStatus);
  // };

  const handleDeactivateStopmClient = () => {
    if (stompClient && stompClient.connected) {
      stompClient.deactivate();
      console.log('Stomp client deactivated on logout');
    }
  };

  // useEffect(() => {
  //   if (stompClient) {
  //     if (!stompClient.connected) {
  //       stompClient.activate();
  //       console.log('Stomp client activated');
  //     } else {
  //       // handleOnlineStatus(true);
  //       console.log('send online status true');
  //     }
  //   }
  //   return () => {
  //     if (stompClient && stompClient.connected) {
  //       // handleOnlineStatus(false);
  //       stompClient.deactivate();
  //       console.log('send online status false');
  //     }
  //   };
  // }, [stompClient]);

  useEffect(() => {
    if (stompClient && !stompClient.connected) {
      stompClient.activate();
      console.log('Stomp client activated');
    }
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  return {
    stompClient,
    subscribeToMessages,
    unsubscribeFromMessages,
    subscribeToUserErrors,
    subscribeToUsersStatuses,
    sendMessage,
    sendEvent,
    handleDeactivateStopmClient,
  };
};
