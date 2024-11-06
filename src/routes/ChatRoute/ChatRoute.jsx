import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch.js';
import URLs from '@/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersOnlineStatuses } from '@/redux-store/UserOperations/UserOperations';
import { updateUserStatus } from '@/redux-store/slices/userStatusesSlice';
import { getUsersStatuses } from '@/redux-store/selectors.js';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';

import { useWebSocket } from '@/hooks/useWebSocket.js';
import { useChatContext } from '@/providers/ChatProvider.jsx';
// import useUserActivity from '@/hooks/useUserActivity.js';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [participantsAmount, setParticipantsAmount] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const listOfOnlineStatuses = useSelector(getUsersStatuses);
  const { responseData } = useFetch(URLs.userCountries);
  const {
    stompClient,
    subscribeToUsersStatuses,
    // sendMessageOrEvent,
    unsubscribeFromUsersStatuses,
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
    dispatch(fetchUsersOnlineStatuses());
  }, [dispatch]);

  const handleStatusUpdate = receivedStatus => {
    dispatch(
      updateUserStatus({
        userId: receivedStatus.userId,
        status: {
          isOnline: receivedStatus.isOnline,
          lastSeenOn: receivedStatus.lastSeenOn || null,
        },
      })
    );
    console.log('received status:', receivedStatus);
    console.log('list of statuses:', listOfOnlineStatuses);
  };

  useEffect(() => {
    if (stompClient?.connected) {
      const subscription = subscribeToUsersStatuses(
        URLs.usersOnlineStatus,
        handleStatusUpdate
      );

      return () => {
        if (subscription) {
          unsubscribeFromUsersStatuses();
        }
      };
    }
  }, [stompClient]);

  // const handleUserActiveEvent = () => {
  //   sendMessageOrEvent({ isOnline: true }, URLs.updateOnlineStatus);
  // };

  // useUserActivity(handleUserActiveEvent);

  return (
    <ChatRouteStyled>
      <SearchBar
        setChatData={setChatData}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setSelectedCompanion={setSelectedCompanion}
        setParticipantsAmount={setParticipantsAmount}
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
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
