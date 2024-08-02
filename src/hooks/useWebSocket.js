import { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStompClient } from 'react-stomp-hooks';

export const useWebSocket = () => {
  const subscriptionRoom = useRef(null);
  const onDataReceivedRef = useRef(null);
  const stompClient = useStompClient();

  const subscribeToCountryRoom = (
    userId,
    countryName,
    onCountryRoomDataReceived
  ) => {
    if (stompClient && stompClient.connected) {
      if (subscriptionRoom.current) {
        subscriptionRoom.current.unsubscribe();
      }

      subscriptionRoom.current = stompClient.subscribe(
        `/countries/${countryName}/user/${userId}`,
        response => {
          const data = JSON.parse(response.body);
          console.log('recieved websocket data:', data);
          onCountryRoomDataReceived(data);
        }
      );

      onDataReceivedRef.current = onCountryRoomDataReceived;
    }
  };

  const subscribeToGroupMessages = (response, setCountryData) => {
    const receivedMessage = JSON.parse(response.body);

    setCountryData(prevCountryData => {
      const updatedGroupMessages = [
        ...(prevCountryData.country.groupMessages || []),
        receivedMessage,
      ];
      return {
        ...prevCountryData,
        country: {
          ...prevCountryData.country,
          groupMessages: updatedGroupMessages,
        },
      };
    });
  };

  const openCountryRoom = countryData => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/chat/countries/open`,
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
    subscribeToGroupMessages,
    openCountryRoom,
    sendMessage,
  };
};
