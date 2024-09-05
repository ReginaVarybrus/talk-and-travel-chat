import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const isSubscribedToMessages = useRef(null);
  const isSubscribedToErrors = useRef(false);

  const subscribeToMessages = (endpoint, setCountryData) => {
    if (
      stompClient &&
      stompClient.connected &&
      !isSubscribedToMessages.current
    ) {
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
      isSubscribedToMessages.current = subscription;
      return subscription;
    }
  };

  const unsubscribeFromMessages = () => {
    const subscription = isSubscribedToMessages.current;

    if (stompClient && stompClient.connected && subscription) {
      subscription.unsubscribe();
      isSubscribedToMessages.current = null;
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

  const handleDeactivateStopmClient = () => {
    if (stompClient && stompClient.connected) {
      stompClient.deactivate();
      console.log('Stomp client deactivated on logout');
    }
  };

  useEffect(() => {
    if (stompClient && !stompClient.connected) {
      stompClient.activate();
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
    sendMessage,
    sendEvent,
    handleDeactivateStopmClient,
  };
};
