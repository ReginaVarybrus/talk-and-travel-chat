import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const useWebSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setConnected] = useState(false);

  const createCountryRoom = (countryName, countryData, onDataReceived) => {
    const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
    const client = Stomp.over(socket);

    client.connect({}, frame => {
      setStompClient(client);
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
      });
    });
  };

  const sendMessage = (dataToSend, country, onMessageReceived) => {
    if (stompClient) {
      stompClient.send(
        `/api/group-messages/${country}`,
        {},
        JSON.stringify(dataToSend)
      );
      stompClient.subscribe(`/group-message/${country}`, response => {
        const data = JSON.parse(response.body);
        console.log('recieved message:', data);
        onMessageReceived(data);
      });
    }
    console.log('Message data:', dataToSend);
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.disconnect();
      setStompClient(null);
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
    sendMessage,
    disconnect,
    isConnected,
  };
};

// TODO

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

// const updateCountryRoom = (countryName, countryData, onDataReceived) => {
//   const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
//   const client = Stomp.over(socket);

//   client.connect({}, frame => {
//     setStompClient(client);
//     setConnected(true);

//     console.log(`Connected successfull: ${frame}`);

//     client.send(
//       `/api/country/update/${countryName}`,
//       {},
//       JSON.stringify(countryData)
//     );

//     client.subscribe(`/group-message/${countryName}`, response => {
//       const data = JSON.parse(response.body);
//       onDataReceived(data);
//     });
//   });
// };

// const openCountryRoom = (countryName, countryData, onDataReceived) => {
//   const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
//   const client = Stomp.over(socket);

//   client.connect({}, frame => {
//     setStompClient(client);
//     setConnected(true);

//     console.log(`Connected successfull: ${frame}`);

//     client.subscribe(`/group-message/${countryName}`, response => {
//       const data = JSON.parse(response.body);
//       onDataReceived(data);
//     });
//   });
// };
