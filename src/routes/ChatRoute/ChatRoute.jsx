import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch.js';
import URLs from '@/constants/constants';
import { MESSAGE_TYPES } from '@/constants/messageTypes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersOnlineStatuses } from '@/redux-store/UserOperations/UserOperations';
import { updateUserStatus } from '@/redux-store/slices/userStatusesSlice';
import { getUser } from '@/redux-store/selectors.js';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';

import { useWebSocket } from '@/hooks/useWebSocket.js';
import { useChatContext } from '@/providers/ChatProvider.jsx';
import useUserActivity from '@/hooks/useUserActivity.js';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [participantsAmount, setParticipantsAmount] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [chatOpenedTime, setChatOpenedTime] = useState(null);
  const currentUserId = useSelector(getUser)?.id;
  // const { responseData } = useFetch(URLs.getUserCountriesChats);
  const {
    stompClient,
    // subscribeToMessages,
    // unsubscribeFromMessages,
    subscribeToUsersStatuses,
    sendMessageOrEvent,
    unsubscribeFromUsersStatuses,
  } = useWebSocket();

  const {
    filteredPrivateChats,
    subscriptionRooms,
    setSubscriptionRooms,
    // setDataUserChats,
    setUnreadRoomsCount,
    // setUnreadDMsCount,
    // unreadGroupMessagesCount,
    // setUnreadGroupMessagesCount,
    // setUnreadDMsMessagesCount,
  } = useChatContext();

  const context = useOutletContext();
  const isChatVisible = context?.isChatVisible;
  const setIsChatVisible = context?.setIsChatVisible;

  // useEffect(() => {
  //   if (responseData) {
  //     setSubscriptionRooms(responseData);
  //   }
  //   console.log('subscription rooms', subscriptionRooms);
  // }, [responseData]);

  useEffect(() => {
    dispatch(fetchUsersOnlineStatuses());
  }, [dispatch]);

  // const handleUnreadMessagesUpdate = (message, endpoint, setState) => {
  //   const match = endpoint.match(/\/chat\/(\d+)\/messages/);
  //   const chatId = match ? parseInt(match[1], 10) : null;

  //   if (!chatId) {
  //     console.error(`Failed to extract chatId from endpoint: ${endpoint}`);
  //     return;
  //   }

  //   if (message.type === MESSAGE_TYPES.TEXT) {
  //     setState(prevChats =>
  //       prevChats.map(chat =>
  //         chat.id === chatId
  //           ? {
  //               ...chat,
  //               unreadMessagesCount: (chat.unreadMessagesCount || 0) + 1,
  //             }
  //           : chat
  //       )
  //     );
  //   }
  // };

  // const handleUnreadRoomsMessagesUpdate = (message, endpoint) => {
  //   const match = endpoint.match(/\/chat\/(\d+)\/messages/);
  //   const chatId = match ? parseInt(match[1], 10) : null;

  //   if (!chatId) {
  //     console.error(`Failed to extract chatId from endpoint: ${endpoint}`);
  //     return;
  //   }

  //   if (message.type === MESSAGE_TYPES.TEXT) {
  //     setSubscriptionRooms(prevRooms =>
  //       prevRooms.map(chat =>
  //         chat.id === chatId
  //           ? {
  //               ...chat,
  //               unreadMessagesCount: (chat.unreadMessagesCount || 0) + 1,
  //             }
  //           : chat
  //       )
  //     );
  //   }

  //   if (message.type === MESSAGE_TYPES.TEXT) {
  //     setUnreadRoomsCount(prevCount => (prevCount || 0) + 1);
  //   }
  // };

  // const handleUnreadDMsMessagesUpdate = (message, endpoint) => {
  //   const match = endpoint.match(/\/chat\/(\d+)\/messages/);
  //   const chatId = match ? parseInt(match[1], 10) : null;

  //   if (!chatId) {
  //     console.error(`Failed to extract chatId from endpoint: ${endpoint}`);
  //     return;
  //   }

  //   if (message.type === MESSAGE_TYPES.TEXT) {
  //     setDataUserChats(prevDMs =>
  //       prevDMs.map(chat =>
  //         chat.id === chatId
  //           ? {
  //               ...chat,
  //               unreadMessagesCount: (chat.unreadMessagesCount || 0) + 1,
  //             }
  //           : chat
  //       )
  //     );
  //   }
  // };

  // const useChatSubscriptions = (chats, handleUpdate) => {
  //   useEffect(() => {
  //     const previousChats = new Set();

  //     chats.forEach(chat => {
  //       if (!previousChats.has(chat.id)) {
  //         subscribeToMessages(chat.id, message =>
  //           handleUpdate(message, `/notify/chat/${chat.id}/messages`)
  //         );
  //         previousChats.add(chat.id);
  //       }
  //     });

  //     return () => {
  //       const currentIds = new Set(chats.map(chat => chat.id));
  //       previousChats.forEach(id => {
  //         if (!currentIds.has(id)) {
  //           unsubscribeFromMessages(id);
  //           previousChats.delete(id);
  //         }
  //       });
  //     };
  //   }, [chats, handleUpdate]);
  // };

  // useEffect(() => {
  //   const previousRooms = new Set();

  //   subscriptionRooms.forEach(chat => {
  //     if (!previousRooms.has(chat.id)) {
  //       subscribeToMessages(chat.id, handleUnreadRoomsMessagesUpdate);
  //       previousRooms.add(chat.id);
  //     }
  //   });

  //   return () => {
  //     const currentIds = new Set(subscriptionRooms.map(chat => chat.id));
  //     previousRooms.forEach(id => {
  //       if (!currentIds.has(id)) {
  //         unsubscribeFromMessages(id);
  //         previousRooms.delete(id);
  //       }
  //     });
  //   };
  // }, [subscriptionRooms]);

  // useEffect(() => {
  //   const previousDMs = new Set();

  //   filteredPrivateChats.forEach(chat => {
  //     if (!previousDMs.has(chat.id)) {
  //       subscribeToMessages(chat.id, handleUnreadDMsMessagesUpdate);
  //       previousDMs.add(chat.id);
  //     }
  //   });

  //   return () => {
  //     const currentIds = new Set(filteredPrivateChats.map(chat => chat.id));
  //     previousDMs.forEach(id => {
  //       if (!currentIds.has(id)) {
  //         unsubscribeFromMessages(id);
  //         previousDMs.delete(id);
  //       }
  //     });
  //   };
  // }, [filteredPrivateChats]);

  // useChatSubscriptions(subscriptionRooms, (message, endpoint) =>
  //   handleUnreadMessagesUpdate(message, endpoint, setSubscriptionRooms)
  // );

  // useChatSubscriptions(filteredPrivateChats, (message, endpoint) =>
  //   handleUnreadMessagesUpdate(message, endpoint, setDataUserChats)
  // );

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

  const handleUserActiveEvent = status => {
    sendMessageOrEvent(status, URLs.updateOnlineStatus);
  };

  useUserActivity(handleUserActiveEvent, currentUserId);

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
        setChatOpenedTime={setChatOpenedTime}
      />

      <Chat
        chatData={chatData}
        setChatData={setChatData}
        // setSubscriptionRooms={setSubscriptionRooms}
        isSubscribed={isSubscribed}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        selectedCompanion={selectedCompanion}
        setSelectedCompanion={setSelectedCompanion}
        participantsAmount={participantsAmount}
        setParticipantsAmount={setParticipantsAmount}
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
        chatOpenedTime={chatOpenedTime}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
