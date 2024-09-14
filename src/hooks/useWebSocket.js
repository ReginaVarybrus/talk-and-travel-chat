import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const isSubscribedToMessages = useRef(null);
  const isSubscribedToErrors = useRef(false);

  const subscribeToMessages = (endpoint, setCountryData) => {
    // console.log(`Subscribing to messages at ${endpoint}`);
    if (
      stompClient &&
      stompClient.connected &&
      !isSubscribedToMessages.current
    ) {
      const subscription = stompClient.subscribe(endpoint, response => {
        const receivedMessage = JSON.parse(response.body);
        // console.log(`Received message:`, receivedMessage);

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
      // console.log('Unsubscribed from messages');
    }
  };

  const subscribeToUserErrors = (endpoint, setCountryData) => {
    // console.log(`Subscribing to user errors at ${endpoint}`);
    if (stompClient && stompClient.connected && !isSubscribedToErrors.current) {
      stompClient.subscribe(endpoint, response => {
        const receivedError = JSON.parse(response.body);
        // console.log(`Received error:`, receivedError);
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
      // console.log(`Subscribed to user errors at ${endpoint}`);
    }
  };

  const sendMessage = message => {
    // console.log('Preparing to send message:', message);
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/chat/messages`,
        body: JSON.stringify(message),
      });
      // console.log('Sending message:', message);
    } else {
      console.error(
        'MESSAGE.Stomp client is not connected or no current room.'
      );
    }
  };

  const sendEvent = (message, endpoint) => {
    // console.log(`Sending event to ${endpoint}:`, message);
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
    sendMessage,
    sendEvent,
    handleDeactivateStopmClient,
  };
};
