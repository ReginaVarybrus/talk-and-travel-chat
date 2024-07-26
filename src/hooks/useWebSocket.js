import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  // const [isConnected, setConnected] = useState(false);
  const subscriptionRoom = useRef(null);
  const onDataReceivedRef = useRef(null);
  const stompClient = useStompClient();

  const subscribeToCountryRoom = (countryName, onDataReceived) => {
    if (stompClient && stompClient.connected) {
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

      onDataReceivedRef.current = onDataReceived;
    }
  };

  // const createCountryRoom = countryData => {
  //   if (stompClient && stompClient.connected) {
  //     stompClient.publish({
  //       destination: `/chat/countries/create`,
  //       body: JSON.stringify(countryData),
  //     });
  //   } else {
  //     console.error('CREATED. Stomp client is not connected.');
  //   }
  // };

  // const updateCountryRoom = (countryName, countryData) => {
  //   if (stompClient && stompClient.connected) {
  //     stompClient.publish({
  //       destination: `/chat/countries/update/${countryName}`,
  //       body: JSON.stringify(countryData),
  //     });
  //   } else {
  //     console.error('UPDATE. Stomp client is not connected.');
  //   }
  // };

  const openCountryRoom = (countryName, countryData) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/countries/${countryName}/open`,
        body: JSON.stringify(countryData),
      });
    } else {
      console.error('OPEN. Stomp client is not connected.');
    }
  };

  const sendMessage = message => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/chat/group-messages`,
        body: JSON.stringify(message),
      });
    } else {
      console.error(
        'MESSAGE.Stomp client is not connected or no current room.'
      );
    }
  };

  useEffect(() => {
    if (stompClient && !stompClient.connected) {
      stompClient.activate();
    }
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  return {
    stompClient,
    subscribeToCountryRoom,
    // createCountryRoom,
    // updateCountryRoom,
    openCountryRoom,
    sendMessage,
  };
};
