import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

export const connect = (countryName, countryData, onDataReceived) => {
  const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
  stompClient = Stomp.over(socket);
  // stompClient.heartbeat.outgoing = 20000;
  // stompClient.heartbeat.incoming = 0;
  // stompClient.reconnect_delay = 3000;

  stompClient.connect({}, frame => {
    // setConnected(true);
    console.log(`Connected successfull: ${frame}`);

    stompClient.send(
      `/api/country/${countryName}`,
      {},
      JSON.stringify(countryData)
    );

    stompClient.subscribe(`/group-message/${countryName}`, response => {
      const data = JSON.parse(response.body);
      console.log('websocket data', data);
      onDataReceived(data);
    });
  });
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  // setConnected(false);
  console.log('Disconnected');
};

export const sendMessage = (countryName, message) => {
  stompClient.send(
    `/api/group-messages/${countryName}`,
    JSON.stringify(message)
  );
  stompClient.subscribe(`/group-message/${countryName}`, response => {
    const data = JSON.parse(response.body);
    console.log('websocket message data', data);
  });
};
