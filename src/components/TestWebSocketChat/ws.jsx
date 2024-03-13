// eslint-disable-next-line import/no-extraneous-dependencies
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// const stompClient = new StompJs.Client({
//     brokerURL: ''
// });

// {
//     "userId": 1,
//     "name": "Bulgaria",
//     "flagCode": "bg"
// }

let stompClient = null;

export const connect = () => {
  const socket = new SockJS('https://talk-and-travel.pp.ua/ws');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, frame => {
    // setConnected(true);
    console.log(`Connected: ${frame}`);
    stompClient.subscribe('/country/Ukraine', response => {
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
