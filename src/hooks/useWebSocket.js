import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const isSubscribedToMessages = useRef(false);
  const isSubscribedToEvents = useRef(false);

  const subscribeToGroupMessages = (endpoint, setCountryData) => {
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

  const subscribeToGroupEvents = (endpoint, setCountryData) => {
    if (stompClient && stompClient.connected && isSubscribedToEvents) {
      stompClient.subscribe(endpoint, response => {
        const receivedEvent = JSON.parse(response.body);

        setCountryData(prevCountryData => {
          const updatedEvents = [
            ...(prevCountryData.events || []),
            receivedEvent,
          ];
          return {
            ...prevCountryData,
            events: updatedEvents,
          };
        });
      });
      isSubscribedToEvents.current = true;
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
    subscribeToGroupMessages,
    subscribeToGroupEvents,
    sendMessage,
    sendEvent,
  };
};
