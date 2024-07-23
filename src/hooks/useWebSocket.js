import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  // const [isConnected, setConnected] = useState(false);
  // const [currentRoom, setCurrentRoom] = useState(null);
  const subscriptionRoom = useRef(null);
  const onDataReceivedRef = useRef(null);
  const stompClient = useStompClient();

  // const onError = err => {
  //   console.log('connect error', err);
  // };

  // const connect = () => {
  //   const socket = new SockJS(`${import.meta.env.VITE_APP_API_URL}/ws/`);
  //   const client = Stomp.over(socket);
  //   client.connect(
  //     {},
  //     frame => {
  //       setStompClient(client);
  //       setConnected(true);
  //       console.log('isConnected:', isConnected);
  //       console.log(`Connected successfull TEST: ${frame}`);
  //     },
  //     onError
  //   );
  // };

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

  // useSubscription(`/countries/${countryName}`, (response) => setLastMessage(response.body));

  const createCountryRoom = countryData => {
    if (stompClient && stompClient.connected) {
      // stompClient.send(
      //   `/chat/countries/create/${countryName}`,
      //   {},
      //   JSON.stringify(countryData)
      // );
      stompClient.publish({
        destination: `/chat/countries/create`,
        body: JSON.stringify(countryData),
      });
    } else {
      console.error('CREATED. Stomp client is not connected.');
    }
  };

  const updateCountryRoom = (countryName, countryData) => {
    if (stompClient && stompClient.connected) {
      // stompClient.send(
      //   `/chat/countries/update/${countryName}`,
      //   {},
      //   JSON.stringify(countryData)
      // );
      stompClient.publish({
        destination: `/chat/countries/update/${countryName}`,
        body: JSON.stringify(countryData),
      });
    } else {
      console.error('UPDATE. Stomp client is not connected.');
    }
  };

  const openCountryRoom = countryName => {
    console.log('opencountry room');
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/chat/countries/find-by-name/${countryName}`,
        body: '',
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
    createCountryRoom,
    updateCountryRoom,
    openCountryRoom,
    sendMessage,
  };
};
