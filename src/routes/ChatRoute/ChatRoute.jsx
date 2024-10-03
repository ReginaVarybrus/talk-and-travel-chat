import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/constants/constants';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { axiosClient } from '@/services/api';

import { useWebSocket } from '@/hooks/useWebSocket.js';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [chatData, setChatData] = useState({});
  const [subscriptionRooms, setSubscriptionRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [participantsAmount, setParticipantsAmount] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [listOfOnlineUsers, setListOfOnlineUsers] = useState(new Map());
  const { responseData } = useFetch(ULRs.userCountries);
  const { subscribeToUsersStatuses } = useWebSocket();

  useEffect(() => {
    if (responseData) {
      setSubscriptionRooms(responseData);
    }
  }, [responseData]);

  useEffect(() => {
    subscribeToUsersStatuses(ULRs.usersOnlineStatus);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(ULRs.getUsersOnlineStatusPath);

        console.log('Received data:', response.data);
        const mapData = new Map();

        Object.entries(response.data).forEach(([id, value]) => {
          mapData.set(id, value);
        });

        setListOfOnlineUsers(mapData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ChatRouteStyled>
      <SearchBar
        setChatData={setChatData}
        subscriptionRooms={subscriptionRooms}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setSelectedCompanion={setSelectedCompanion}
        setParticipantsAmount={setParticipantsAmount}
        listOfOnlineUsers={listOfOnlineUsers}
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
        listOfOnlineUsers={listOfOnlineUsers}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
