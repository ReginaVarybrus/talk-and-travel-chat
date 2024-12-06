import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { axiosClient } from '@/services/api';
import Swal from 'sweetalert2';
import URLs from '@/constants/constants';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getToken, getUser } from '@/redux-store/selectors';
import { useWebSocket } from '@/hooks/useWebSocket';
import { MESSAGE_TYPES } from '@/constants/messageTypes';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const isUserLoggedIn = useSelector(getIsLoggedIn);
  const token = useSelector(getToken);
  const userId = useSelector(getUser)?.id;

  const [subscriptionRooms, setSubscriptionRooms] = useState([]);
  const [dataUserChats, setDataUserChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [unreadRoomsCount, setUnreadRoomsCount] = useState(0);
  const [unreadDMsCount, setUnreadDMsCount] = useState(0);
  const [searchedValue, setSearchedValue] = useState('');
  const [loading, setLoading] = useState({ rooms: false, dms: false });
  const [messagesToMarkAsRead, setMessagesToMarkAsRead] = useState([]);
  const [newMessageFromWebsocket, setNewMessageFromWebsocket] = useState([]);

  const currentChatIdRef = useRef(currentChatId);

  const { subscribeToMessages, unsubscribeFromMessages, isClientConnected } =
    useWebSocket();

  const isLoggedIn = isUserLoggedIn && token;

  const updateUnreadMessagesCount = useCallback(
    (chatId, newCount, isPrivateChat) => {
      if (isPrivateChat) {
        setDataUserChats(prevChats => {
          const updatedChats = prevChats.map(chat =>
            chat.chat.id === chatId
              ? {
                  ...chat,
                  chat: { ...chat.chat, unreadMessagesCount: newCount },
                }
              : chat
          );
          const totalUnreadDMs = updatedChats.reduce(
            (acc, chat) => acc + (chat.chat.unreadMessagesCount || 0),
            0
          );
          setUnreadDMsCount(totalUnreadDMs);
          return updatedChats;
        });
      } else {
        setSubscriptionRooms(prevRooms => {
          const updatedRooms = prevRooms.map(room =>
            room.id === chatId
              ? { ...room, unreadMessagesCount: newCount }
              : room
          );
          const totalUnreadRooms = updatedRooms.reduce(
            (acc, room) => acc + (room.unreadMessagesCount || 0),
            0
          );
          setUnreadRoomsCount(totalUnreadRooms);
          return updatedRooms;
        });
      }
    },
    []
  );

  useEffect(() => {
    if (!isLoggedIn || !token) {
      return;
    }

    const fetchChats = async () => {
      setLoading(prev => ({ ...prev, rooms: true, dms: true }));

      try {
        const roomsResponse = await axiosClient.get(URLs.getUserCountriesChats);
        setSubscriptionRooms(roomsResponse.data);

        const totalUnreadRooms = roomsResponse.data.reduce(
          (acc, room) => acc + room.unreadMessagesCount,
          0
        );
        setUnreadRoomsCount(totalUnreadRooms);

        const dmsResponse = await axiosClient.get(URLs.getPrivateChats);
        const validChats = dmsResponse.data.filter(
          chat => chat.companion?.id !== null
        );
        setDataUserChats(validChats);

        const totalUnreadDMs = validChats.reduce(
          (acc, chat) => acc + chat.chat.unreadMessagesCount,
          0
        );
        setUnreadDMsCount(totalUnreadDMs);
      } catch (error) {
        console.error('[DEBUG] Error fetching chats:', error);
        Swal.fire({
          text: 'Something went wrong while loading your chats, please try again.',
          icon: 'error',
          showConfirmButton: false,
        });
      } finally {
        setLoading(prev => ({ ...prev, rooms: false, dms: false }));
      }
    };

    fetchChats();
  }, [isLoggedIn, token]);

  useEffect(() => {
    currentChatIdRef.current = currentChatId;
  }, [currentChatId]);

  const handleNewMessage = (chatId, message) => {
    const activeChatId = currentChatIdRef.current;

    if (chatId === activeChatId) {
      setCurrentChatMessages(prevMessages => [...prevMessages, message]);
      setNewMessageFromWebsocket(prev => [...prev, message]);
      if (message.user?.id === userId) {
        setMessagesToMarkAsRead(prev => [...prev, message.id]);
      }
    } else {
      const isPrivateChat = dataUserChats.some(chat => chat.chat.id === chatId);

      if (isPrivateChat) {
        setDataUserChats(prevChats => {
          const updatedChats = prevChats.map(chat => {
            if (chat.chat.id === chatId) {
              if (message.type === MESSAGE_TYPES.TEXT) {
                return {
                  ...chat,
                  chat: {
                    ...chat.chat,
                    unreadMessagesCount:
                      (chat.chat.unreadMessagesCount || 0) + 1,
                  },
                };
              }
            }
            return chat;
          });

          const totalUnreadDMs = updatedChats.reduce(
            (acc, chat) => acc + (chat.chat.unreadMessagesCount || 0),
            0
          );

          setUnreadDMsCount(totalUnreadDMs);

          return updatedChats;
        });
      } else {
        setSubscriptionRooms(prevRooms => {
          const updatedRooms = prevRooms.map(room => {
            if (room.id === chatId) {
              if (message.type === MESSAGE_TYPES.TEXT) {
                return {
                  ...room,
                  unreadMessagesCount: (room.unreadMessagesCount || 0) + 1,
                };
              }
            }
            return room;
          });

          const totalUnreadRooms = updatedRooms.reduce(
            (acc, room) => acc + (room.unreadMessagesCount || 0),
            0
          );

          setUnreadRoomsCount(totalUnreadRooms);

          return updatedRooms;
        });
      }
    }
  };

  // Manage subscriptions
  useEffect(() => {
    if (!isLoggedIn) return;

    const subscriptions = new Map();

    const subscribeToChat = (chatId, isPrivate) => {
      if (!isClientConnected()) {
        return;
      }
      if (!subscriptions.has(chatId)) {
        const subscription = subscribeToMessages(
          `/notify/chat/${chatId}/messages`,
          message => handleNewMessage(chatId, message)
        );
        subscriptions.set(chatId, subscription);
      }
    };

    subscriptionRooms.forEach(room => subscribeToChat(room.id, false));

    dataUserChats.forEach(chat => subscribeToChat(chat.chat.id, true));

    return () => {
      subscriptions.forEach((_, chatId) => {
        unsubscribeFromMessages(chatId);
      });
    };
  }, [
    isLoggedIn,
    subscriptionRooms,
    dataUserChats,
    currentChatId,
    subscribeToMessages,
    unsubscribeFromMessages,
    handleNewMessage,
  ]);

  const updateUserChats = async () => {
    try {
      const response = await axiosClient.get(URLs.getPrivateChats);
      const validChats = response.data.filter(
        chat => chat.companion && chat.companion.id !== null
      );
      setDataUserChats(validChats);
    } catch (error) {
      console.error('Error updating user chats:', error);
    }
  };

  const value = useMemo(
    () => ({
      subscriptionRooms,
      setSubscriptionRooms,
      dataUserChats,
      setDataUserChats,
      currentChatId,
      setCurrentChatId,
      currentChatMessages,
      setCurrentChatMessages,
      searchedValue,
      setSearchedValue,
      updateUnreadMessagesCount,
      unreadDMsCount,
      unreadRoomsCount,
      messagesToMarkAsRead,
      setMessagesToMarkAsRead,
      newMessageFromWebsocket,
      setNewMessageFromWebsocket,
      updateUserChats,
    }),
    [
      subscriptionRooms,
      dataUserChats,
      currentChatId,
      currentChatMessages,
      handleNewMessage,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
