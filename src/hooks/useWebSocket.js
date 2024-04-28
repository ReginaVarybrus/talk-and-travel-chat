import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { getUser } from '@/redux-store/selectors.js';

// create
// {
//   userId,
//   name,
//   flagCode,
// };

// update
// {
//   "id": 1,
//   "userId": 3
// }

export const useWebSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const [connectedCountryRoom, setConnectedCountryRoom] = useState(null);
  const [isConnected, setConnected] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const userId = useSelector(getUser)?.id;

  const createCountryRoom = (countryName, countryData, onDataReceived) => {
    const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
    const client = Stomp.over(socket);

    client.connect({}, frame => {
      setStompClient(client);
      setConnectedCountryRoom(countryName);
      setConnected(true);

      console.log(`Connected successfull: ${frame}`);

      client.send(
        `/api/country/create/${countryName}`,
        {},
        JSON.stringify(countryData)
      );

      client.subscribe(`/group-message/${countryName}`, response => {
        const data = JSON.parse(response.body);
        console.log('recieved websocket data:', data);
        onDataReceived(data);

        console.log('websocket data:', data);

        if (data && data.id) {
          setCountryId(data.id);
        }
      });
    });
  };

  const updateCountryRoom = (countryName, countryData, onDataReceived) => {
    const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
    const client = Stomp.over(socket);

    client.connect({}, frame => {
      setStompClient(client);
      setConnectedCountryRoom(countryName);
      setConnected(true);

      console.log(`Connected successfull: ${frame}`);

      client.send(
        `/api/country/update/${countryName}`,
        {},
        JSON.stringify(countryData)
      );

      client.subscribe(`/group-message/${countryName}`, response => {
        const data = JSON.parse(response.body);
        onDataReceived(data);

        console.log('websocket data:', data);

        if (data && data.id) {
          setCountryId(data.id);
        }
      });
    });
  };

  const openCountryRoom = (countryName, countryData, onDataReceived) => {
    const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
    const client = Stomp.over(socket);

    client.connect({}, frame => {
      setStompClient(client);
      setConnectedCountryRoom(countryName);
      setConnected(true);

      console.log(`Connected successfull: ${frame}`);

      client.subscribe(`/group-message/${countryName}`, response => {
        const data = JSON.parse(response.body);
        onDataReceived(data);

        console.log('websocket data:', data);

        if (data && data.id) {
          setCountryId(data.id);
        }
      });
    });
  };

  const sendMessage = message => {
    const dataToSend = {
      content: message,
      senderId: userId,
      countryId,
    };
    if (stompClient) {
      stompClient.send(
        `/api/group-messages/${connectedCountryRoom}`,
        {},
        JSON.stringify(dataToSend)
      );
    }
    console.log('Message data:', dataToSend);
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.disconnect();
      setStompClient(null);
      setConnectedCountryRoom(null);
      setConnected(false);
      console.log('Disconnected');
    }
  };

  useEffect(
    () => () => {
      disconnect();
    },
    []
  );

  return {
    createCountryRoom,
    updateCountryRoom,
    openCountryRoom,
    sendMessage,
    disconnect,
    isConnected,
  };
};
