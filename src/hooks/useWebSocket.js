import { useRef, useEffect } from 'react';
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const messagesSubscription = useRef(null);
  const isSubscribedToErrors = useRef(false);
  const statusesSubscription = useRef(null);

  const subscribeToMessages = (endpoint, setCountryData) => {
    if (stompClient?.connected && !messagesSubscription.current) {
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

    if (stompClient?.connected && subscription) {
      subscription.unsubscribe();
      messagesSubscription.current = null;
    }
  };

  const subscribeToUserErrors = (endpoint, setCountryData) => {
    if (stompClient?.connected && !isSubscribedToErrors.current) {
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

  const subscribeToUsersStatuses = (endpoint, setUserStatus) => {
    if (stompClient?.connected && !statusesSubscription.current) {
      const subscription = stompClient.subscribe(endpoint, response => {
        const receivedStatus = JSON.parse(response.body);
        setUserStatus(prevMap => {
          const updatedMap = new Map(prevMap);
          updatedMap.set(
            receivedStatus.userId.toString(),
            receivedStatus.isOnline
          );
          return updatedMap;
        });
      });

      statusesSubscription.current = subscription;
      return subscription;
    }
  };

  const unsubscribeFromUsersStatuses = () => {
    const subscription = statusesSubscription.current;

    if (stompClient?.connected && subscription) {
      subscription.unsubscribe();
      statusesSubscription.current = null;
    }
  };

  const sendMessage = message => {
    if (stompClient?.connected) {
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
    if (stompClient?.connected) {
      stompClient.publish({
        destination: endpoint,
        body: JSON.stringify(message),
      });
    } else {
      console.error('EVENT.Stomp client is not connected or no current room.');
    }
  };

  const handleDeactivateStopmClient = () => {
    if (stompClient?.connected) {
      stompClient.deactivate();
      console.log('Stomp client deactivated on logout');
    }
  };

  useEffect(() => {
    if (stompClient && !stompClient.connected) {
      stompClient.activate();
      console.log('Stomp client activated');
    }

    return () => {
      if (stompClient?.connected) {
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
    unsubscribeFromUsersStatuses,
    sendMessage,
    sendEvent,
    handleDeactivateStopmClient,
  };
};
