import { useRef, useEffect } from 'react';
import { useStompClient } from 'react-stomp-hooks';
import ULRs from '@/constants/constants';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const messagesSubscription = useRef(null);
  const isSubscribedToErrors = useRef(false);
  const isSubscribedToUsersStatuses = useRef(false);

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
    if (
      stompClient &&
      stompClient.connected &&
      !isSubscribedToUsersStatuses.current
    ) {
      stompClient.subscribe(endpoint, response => {
        const receivedStatuses = JSON.parse(response);
        console.log('received online statuses', receivedStatuses);
      });
      isSubscribedToUsersStatuses.current = true;
    } else {
      console.log(
        'Subscription failed: Stomp client is not connected or already subscribed.'
      );
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
      console.log('Stomp client activated');
    }

    if (stompClient && stompClient.connected) {
      console.log('Stomp client is connected, subscribing...');
      subscribeToUsersStatuses(ULRs.usersOnlineStatus);
    } else {
      console.log('Waiting for Stomp client to connect...');
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
