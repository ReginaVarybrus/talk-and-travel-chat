import { useRef, useEffect } from 'react';
import { useStompClient } from 'react-stomp-hooks';
// import URLs from '@/constants/constants.js';

export const useWebSocket = () => {
  const stompClient = useStompClient();
  const subscriptions = useRef({
    messages: null,
    errors: false,
    statuses: null,
  });

  // Function for checking StompClient connection
  const isClientConnected = () => stompClient?.connected;

  // General function for subscribing
  const subscribe = (endpoint, callback, type) => {
    if (isClientConnected() && !subscriptions.current[type]) {
      const subscription = stompClient.subscribe(endpoint, response => {
        const parsedData = JSON.parse(response.body);
        callback(parsedData);
      });
      subscriptions.current[type] = subscription;
      return subscription;
    }
  };

  // General function for unsubscribing
  const unsubscribe = type => {
    const subscription = subscriptions.current[type];
    if (isClientConnected() && subscription) {
      subscription.unsubscribe();
      subscriptions.current[type] = null;
    }
  };

  const subscribeToMessages = (endpoint, handleNewMessage) =>
    subscribe(endpoint, handleNewMessage, 'messages');

  const unsubscribeFromMessages = () => unsubscribe('messages');

  const subscribeToUserErrors = (endpoint, setCountryData) => {
    if (isClientConnected() && !subscriptions.current.errors) {
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
      subscriptions.current.errors = true;
    }
  };

  const subscribeToUsersStatuses = (endpoint, setUserStatus) =>
    subscribe(
      endpoint,
      receivedStatus => {
        setUserStatus(prevMap => {
          const updatedMap = new Map(prevMap);
          updatedMap.set(receivedStatus.userId.toString(), {
            isOnline: receivedStatus.isOnline,
            lastSeenOn: receivedStatus.lastSeenOn || null,
          });
          return updatedMap;
        });
      },
      'statuses'
    );

  const unsubscribeFromUsersStatuses = () => unsubscribe('statuses');

  const sendMessageOrEvent = (message, endpoint) => {
    if (isClientConnected()) {
      console.log('websocket message send to:', endpoint);
      stompClient.publish({
        destination: endpoint,
        body: JSON.stringify(message),
      });
    } else {
      console.error(
        'MESSAGE.Stomp client is not connected or no current chat.'
      );
    }
  };

  const handleDeactivateStopmClient = () => {
    if (isClientConnected()) {
      stompClient.deactivate();
    }
  };

  useEffect(() => {
    if (stompClient && !isClientConnected()) {
      stompClient.activate();
    }
  }, [stompClient]);

  return {
    stompClient,
    subscribeToMessages,
    unsubscribeFromMessages,
    subscribeToUserErrors,
    subscribeToUsersStatuses,
    unsubscribeFromUsersStatuses,
    sendMessageOrEvent,
    handleDeactivateStopmClient,
  };
};
