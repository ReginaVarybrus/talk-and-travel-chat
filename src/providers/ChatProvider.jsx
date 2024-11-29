import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { axiosClient } from '@/services/api';
import URLs from '@/constants/constants';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getToken } from '@/redux-store/selectors';
import { useWebSocket } from '@/hooks/useWebSocket';
import { MESSAGE_TYPES } from '@/constants/messageTypes';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const isUserLoggedIn = useSelector(getIsLoggedIn);
  const token = useSelector(getToken);
  const [subscriptionRooms, setSubscriptionRooms] = useState([]);
  const [dataUserChats, setDataUserChats] = useState([]);

  const [unreadRoomsCount, setUnreadRoomsCount] = useState(0);
  const [unreadDMsCount, setUnreadDMsCount] = useState(0);
  const [searchedValue, setSearchedValue] = useState('');
  const [loading, setLoading] = useState({ rooms: false, dms: false });

  const { subscribeToMessages, unsubscribeFromMessages } = useWebSocket();

  const isLoggedIn = isUserLoggedIn && token;

  // Fetch Rooms and DMs
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchChats = async () => {
      setLoading(prev => ({ ...prev, rooms: true, dms: true }));

      try {
        // Fetch rooms
        const roomsResponse = await axiosClient.get(URLs.getUserCountriesChats);
        setSubscriptionRooms(roomsResponse.data);

        const totalUnreadRooms = roomsResponse.data.reduce(
          (acc, room) => acc + room.unreadMessagesCount,
          0
        );
        setUnreadRoomsCount(totalUnreadRooms);

        // Fetch DMs
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
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(prev => ({ ...prev, rooms: false, dms: false }));
      }
    };

    fetchChats();
  }, [isLoggedIn]);

  // Update unread messages count
  const updateUnreadMessagesCount = useCallback(
    (chatId, unreadCount, isPrivate) => {
      if (isPrivate) {
        setDataUserChats(prevChats =>
          prevChats.map(chat =>
            chat.chat.id === chatId
              ? {
                  ...chat,
                  chat: { ...chat.chat, unreadMessagesCount: unreadCount },
                }
              : chat
          )
        );
      } else {
        setSubscriptionRooms(prevRooms =>
          prevRooms.map(room =>
            room.id === chatId
              ? { ...room, unreadMessagesCount: unreadCount }
              : room
          )
        );
      }
      setUnreadDMsCount(prev =>
        dataUserChats.reduce(
          (acc, chat) => acc + chat.chat.unreadMessagesCount,
          0
        )
      );

      setUnreadRoomsCount(prev =>
        subscriptionRooms.reduce(
          (acc, room) => acc + room.unreadMessagesCount,
          0
        )
      );
    },
    [dataUserChats, subscriptionRooms]
  );

  // Manage subscriptions
  useEffect(() => {
    if (!isLoggedIn) return;

    const subscriptions = new Map();

    const handleNewMessage = (chatId, isPrivate, message) => {
      if (message.type === MESSAGE_TYPES.TEXT) {
        setDataUserChats(prevChats =>
          prevChats.map(chat =>
            chat.chat.id === chatId
              ? {
                  ...chat,
                  chat: {
                    ...chat.chat,
                    unreadMessagesCount: chat.chat.unreadMessagesCount + 1,
                  },
                }
              : chat
          )
        );

        setSubscriptionRooms(prevRooms =>
          prevRooms.map(room =>
            room.id === chatId
              ? {
                  ...room,
                  unreadMessagesCount: room.unreadMessagesCount + 1,
                }
              : room
          )
        );

        // Пересчёт общего числа непрочитанных сообщений
        const totalUnreadDMs = dataUserChats.reduce(
          (acc, chat) => acc + chat.chat.unreadMessagesCount,
          0
        );
        setUnreadDMsCount(totalUnreadDMs);

        const totalUnreadRooms = subscriptionRooms.reduce(
          (acc, room) => acc + room.unreadMessagesCount,
          0
        );
        setUnreadRoomsCount(totalUnreadRooms);
      }
    };

    // Подписываемся на групповые чаты
    subscriptionRooms.forEach(room => {
      if (!subscriptions.has(room.id)) {
        const subscription = subscribeToMessages(
          `/notify/chat/${room.id}/messages`,
          message => handleNewMessage(room.id, false, message)
        );
        subscriptions.set(room.id, subscription);
      }
    });

    // Подписываемся на приватные чаты
    dataUserChats.forEach(chat => {
      if (!subscriptions.has(chat.chat.id)) {
        const subscription = subscribeToMessages(
          `/notify/chat/${chat.chat.id}/messages`,
          message => handleNewMessage(chat.chat.id, true, message)
        );
        subscriptions.set(chat.chat.id, subscription);
      }
    });

    return () => {
      // Убираем все подписки при размонтировании
      subscriptions.forEach((_, chatId) => {
        unsubscribeFromMessages(chatId);
      });
    };
  }, [isLoggedIn, subscriptionRooms, dataUserChats, updateUnreadMessagesCount]);

  useEffect(() => {
    console.log('DataUserChats updated:', dataUserChats);
  }, [dataUserChats]);

  useEffect(() => {
    console.log('SubscriptionRooms updated:', subscriptionRooms);
  }, [subscriptionRooms]);

  const value = useMemo(
    () => ({
      subscriptionRooms,
      setSubscriptionRooms,
      dataUserChats,
      setDataUserChats,
      // filteredPrivateChats,

      unreadRoomsCount,
      unreadDMsCount,
      updateUnreadMessagesCount,
      searchedValue,
      setSearchedValue,
    }),
    [
      subscriptionRooms,
      dataUserChats,
      unreadRoomsCount,
      unreadDMsCount,
      searchedValue,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
