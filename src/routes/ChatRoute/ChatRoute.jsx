import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch.js';
import URLs from '@/constants/constants';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { axiosClient } from '@/services/api';

import { useWebSocket } from '@/hooks/useWebSocket.js';
import { useChatContext } from '@/providers/ChatProvider.jsx';
import useUserActivity from '@/hooks/useUserActivity.js';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [chatData, setChatData] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [participantsAmount, setParticipantsAmount] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [listOfOnlineUsersStatuses, setListOfOnlineUsersStatuses] = useState(
    new Map()
  );
  const { responseData } = useFetch(URLs.userCountries);
  const {
    stompClient,
    subscribeToUsersStatuses,
    unsubscribeFromUsersStatuses,
    sendMessageOrEvent,
  } = useWebSocket();

  const { setSubscriptionRooms } = useChatContext();

  const context = useOutletContext();
  const isChatVisible = context?.isChatVisible;
  const setIsChatVisible = context?.setIsChatVisible;

  useEffect(() => {
    if (responseData) {
      setSubscriptionRooms(responseData);
    }
  }, [responseData]);

  useEffect(() => {
    if (stompClient?.connected) {
      const subscription = subscribeToUsersStatuses(
        URLs.usersOnlineStatus,
        setListOfOnlineUsersStatuses
      );

      return () => {
        if (subscription) {
          unsubscribeFromUsersStatuses();
        }
      };
    }
  }, [stompClient]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(URLs.getUsersOnlineStatusPath);
        console.log('Map of online statuses:', response.data);
        setListOfOnlineUsersStatuses(prevStatus => {
          const updatedList = new Map(prevStatus);
          Object.entries(response.data).forEach(([id, value]) => {
            updatedList.set(id, value);
          });
          return updatedList;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserActiveEvent = () => {
    sendMessageOrEvent(true, URLs.updateOnlineStatus);
  };

  useUserActivity(handleUserActiveEvent);

  return (
    <ChatRouteStyled>
      <SearchBar
        setChatData={setChatData}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setSelectedCompanion={setSelectedCompanion}
        setParticipantsAmount={setParticipantsAmount}
        listOfOnlineUsersStatuses={listOfOnlineUsersStatuses}
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
      />

      <Chat
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isSubscribed={isSubscribed}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        selectedCompanion={selectedCompanion}
        setSelectedCompanion={setSelectedCompanion}
        participantsAmount={participantsAmount}
        setParticipantsAmount={setParticipantsAmount}
        listOfOnlineUsersStatuses={listOfOnlineUsersStatuses}
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
