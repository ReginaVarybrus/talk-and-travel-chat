// eslint-disable-next-line import/no-extraneous-dependencies
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
// import { getUserId } from '@/redux-store/AuthOperations/selectors.js';

// {
//     "userId": 1,
//     "name": "Bulgaria",
//     "flagCode": "bg"
// }

let stompClient = null;

export const connect = (countryName, countryData) => {
  const socket = new SockJS('https://talk-and-travel.pp.ua/ws');
  stompClient = Stomp.over(socket);
  // stompClient.heartbeat.outgoing = 20000;
  // stompClient.heartbeat.incoming = 0;
  // stompClient.reconnect_delay = 3000;

  stompClient.connect({}, frame => {
    // setConnected(true);
    console.log(`Connected: ${frame}`);

    stompClient.send(
      `/api/country/${countryName}`,
      {},
      JSON.stringify(countryData)
    );

    stompClient.subscribe(`/group-message/${countryName}`, response => {
      const data = JSON.parse(response.body);
      console.log('websocket data', data);
    });
  });
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  //   setConnected(false);
  console.log('Disconnected');
};

// export const sendMessage = message => {
//   stompClient.send('/api/group-messages/Ukraine', JSON.stringify(message));
// };

export const sendMessage = message => {
  //   if (msg.trim() !== '') {
  // const message = {
  // senderId: currentUser.id,
  // recipientId: activeContact.id,
  // senderName: currentUser.name,
  // recipientName: activeContact.name,
  // content: msg,
  // timestamp: new Date(),
  // };

  stompClient.send('/api/group-messages/Ukraine', {}, JSON.stringify(message));
  //   }
};
