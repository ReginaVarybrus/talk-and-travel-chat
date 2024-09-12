import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const isSubscribedToMessages = useRef(false);
  const isSubscribedToErrors = useRef(false);

  const subscribeToMessages = (endpoint, setCountryData) => {
    if (stompClient && stompClient.connected && isSubscribedToMessages) {
      stompClient.subscribe(endpoint, response => {
        const receivedMessage = JSON.parse(response.body);

        setCountryData(prevCountryData => {
          const updatedGroupMessages = [
            ...(prevCountryData.messages || []),
            receivedMessage,
          ];
          return {
            ...prevCountryData,
            messages: updatedGroupMessages,
          };
        });
      });
      isSubscribedToMessages.current = true;
    }
  };

  const subscribeToUserErrors = (endpoint, setCountryData) => {
    if (stompClient && stompClient.connected && isSubscribedToErrors) {
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
  }, [stompClient]);

  return {
    stompClient,
    subscribeToMessages,
    subscribeToUserErrors,
    sendMessage,
    sendEvent,
    handleDeactivateStopmClient,
  };
};
