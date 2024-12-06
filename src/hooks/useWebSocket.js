import { getIsLoggedIn, getToken } from '@/redux-store/selectors';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  const isUserLoggedIn = useSelector(getIsLoggedIn);
  const token = useSelector(getToken);
  const stompClient = useStompClient();

  const subscriptions = useRef(new Map());

  // Function for checking StompClient connection
  const isClientConnected = () => stompClient?.connected;

  // General function for subscribing
  const subscribe = (endpoint, callback) => {
    if (!isClientConnected()) {
      console.error(
        `[WebSocket] Client not connected. Cannot subscribe to ${endpoint}`
      );
      return null;
    }

    if (!subscriptions.current.has(endpoint)) {
      const subscription = stompClient.subscribe(endpoint, response => {
        try {
          const parsedData = JSON.parse(response.body);
          callback(parsedData, endpoint);
        } catch (error) {
          console.error(
            `[WebSocket] Failed to parse message from ${endpoint}:`,
            error
          );
        }
      });
      subscriptions.current.set(endpoint, subscription);
    }
  };

  // General function for unsubscribing
  const unsubscribe = endpoint => {
    const subscription = subscriptions.current.get(endpoint);
    if (subscription) {
      subscription.unsubscribe();
      subscriptions.current.delete(endpoint);
    }
  };

  const unsubscribeFromMessages = () => unsubscribe('messages');

  const subscribeToMessages = (endpoint, handleNewMessage) =>
    subscribe(endpoint, handleNewMessage);

  const subscribeToUserErrors = (endpoint, setCountryData) =>
    subscribe(endpoint, response => {
      const receivedError = JSON.parse(response.body);
      setCountryData(prevCountryData => {
        const updatedError = [...(prevCountryData.events || []), receivedError];
        return {
          ...prevCountryData,
          events: updatedError,
        };
      });
    });

  const subscribeToUsersStatuses = (endpoint, onUpdateStatus) =>
    subscribe(endpoint, receivedStatus => onUpdateStatus(receivedStatus));

  const unsubscribeFromUsersStatuses = () => unsubscribe('statuses');

  const sendMessageOrEvent = (message, endpoint) => {
    if (isClientConnected()) {
      stompClient.publish({
        destination: endpoint,
        body: JSON.stringify(message),
      });
    } else {
      console.warn('MESSAGE.Stomp client is not connected or no current chat.');
    }
  };

  const handleDeactivateStopmClient = () => {
    if (isClientConnected()) {
      stompClient.deactivate();
    }
  };

  useEffect(() => {
    if (stompClient && isUserLoggedIn && token) {
      if (!isClientConnected()) {
        stompClient.activate();
      }
    } else {
      console.warn('WebSocket activation skipped. User not logged in.');
    }
  }, [stompClient, isUserLoggedIn, token]);

  return {
    stompClient,
    subscribeToMessages,
    unsubscribeFromMessages,
    subscribeToUserErrors,
    subscribeToUsersStatuses,
    unsubscribeFromUsersStatuses,
    sendMessageOrEvent,
    handleDeactivateStopmClient,
    isClientConnected,
  };
};
