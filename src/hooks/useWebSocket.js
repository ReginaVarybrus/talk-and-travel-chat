import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const useWebSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setConnected] = useState(false);
  const subscriptionRoom = useRef(null);
  // const subscriptionMessages = useRef(null);
  const onDataReceivedRef = useRef(null);

  const onError = err => {
    console.log('connect error', err);
  };

  const connect = () => {
    const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
    const client = Stomp.over(socket);
    client.connect(
      {},
      frame => {
        setStompClient(client);
        setConnected(true);
        console.log(`Connected successfull: ${frame}`);
      },
      onError
    );
  };

  const subscribeToCountryRoom = (countryName, onDataReceived) => {
    if (stompClient && isConnected) {
      if (subscriptionRoom.current) {
        subscriptionRoom.current.unsubscribe();
      }

      subscriptionRoom.current = stompClient.subscribe(
        `/countries/${countryName}`,
        response => {
          const data = JSON.parse(response.body);
          console.log('recieved websocket data:', data);
          onDataReceived(data);
        }
      );

      // stompClient.subscribe(`/group-messages/${countryName}`, response => {
      //   const message = JSON.parse(response.body);
      //   console.log('recieved message data:', message);
      //   // onMessageRecieved(message);
      //   onDataReceived(prevData => ({
      //     ...prevData,
      //     groupMessages: [...(prevData.groupMessages || []), message],
      //   }));
      // });

      onDataReceivedRef.current = onDataReceived;
    }
  };

  const createCountryRoom = (countryName, countryData) => {
    if (stompClient && isConnected) {
      stompClient.send(
        `/chat/countries/create/${countryName}`,
        {},
        JSON.stringify(countryData)
      );
    } else {
      console.error('CREATED. Stomp client is not connected.');
    }
  };

  const updateCountryRoom = (countryName, countryData) => {
    if (stompClient && isConnected) {
      stompClient.send(
        `/chat/countries/update/${countryName}`,
        {},
        JSON.stringify(countryData)
      );
    } else {
      console.error('UPDATE. Stomp client is not connected.');
    }
  };

  const openCountryRoom = countryName => {
    if (stompClient && isConnected) {
      stompClient.send(`/chat/countries/find-by-name/${countryName}`, {});
    } else {
      console.error('OPEN. Stomp client is not connected.');
    }
  };

  const sendMessage = (countryName, message) => {
    if (stompClient && isConnected) {
      stompClient.send(
        `/chat/group-messages/${countryName}`,
        {},
        JSON.stringify(message)
      );
    } else {
      console.error('MESSAGE. Stomp client is not connected.');
    }
  };

  const disconnect = () => {
    if (stompClient !== null) {
      if (subscriptionRoom.current) {
        subscriptionRoom.current.unsubscribe();
      }
      stompClient.disconnect();
      setStompClient(null);
      setConnected(false);
      console.log('Disconnected');
    }
  };

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  return {
    subscribeToCountryRoom,
    createCountryRoom,
    updateCountryRoom,
    openCountryRoom,
    sendMessage,
    disconnect,
    isConnected,
  };
};
