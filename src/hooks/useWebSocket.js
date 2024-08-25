/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useRef, useEffect } from 'react';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { useSelector } from 'react-redux';
import { getToken } from '@/redux-store/selectors.js';

export const useWebSocket = () => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const token = useSelector(getToken);
  const currentSubscription = useRef({ messages: null, errors: null });

  useEffect(() => {
    if (!token) return;

    const socket = new SockJS(`${import.meta.env.VITE_APP_API_WS_URL}/ws/`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        setConnected(true);
        console.log('Connected');
      },
      onDisconnect: () => {
        setConnected(false);
        console.log('Disconnected');
      },
      onStompError: frame => {
        console.error(`Broker reported error: ${frame.headers.message}`);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setConnected(false);
      console.log('WebSocket deactivated');
    };
  }, [token]);

  // Function of subscribing to the recieved messages in the chat room. Subscribe depends of chatId
  const subscribeToGroupMessages = (endpoint, setCountryData) => {
    if (client && connected) {
      if (currentSubscription.messages) {
        currentSubscription.messages.unsubscribe();
      }
      const subscribing = client.subscribe(endpoint, response => {
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
      currentSubscription.messages = subscribing;
    } else {
      console.error(
        'Client is not connected. Unable to subscribe to messages.'
      );
    }
  };

  // Function of subscribing to the user errors in the chat room. Subscribe depends of userId
  const subscribeToUserErrors = (endpoint, setCountryData) => {
    if (client && connected) {
      if (currentSubscription.errors) {
        currentSubscription.errors.unsubscribe();
      }
      const subscribing = client.subscribe(endpoint, response => {
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
      currentSubscription.current.errors = subscribing;
    } else {
      console.error('Client is not connected. Unable to subscribe to errors.');
    }
  };

  const sendMessage = message => {
    if (client && connected) {
      client.publish({
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
    if (client && connected) {
      client.publish({
        destination: endpoint,
        body: JSON.stringify(message),
      });
    } else {
      console.error('EVENT.Stomp client is not connected or no current room.');
    }
  };

  return {
    connected,
    subscribeToGroupMessages,
    subscribeToUserErrors,
    sendMessage,
    sendEvent,
  };
};
