import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useFetch } from '@/hooks/useFetch';
import URLs from '@/constants/constants';
import { axiosClient } from '@/services/api';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getToken } from '@/redux-store/selectors';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const isUserLoggedIn = useSelector(getIsLoggedIn);
  const token = useSelector(getToken);
  const [subscriptionRooms, setSubscriptionRooms] = useState([]);
  const [dataUserChats, setDataUserChats] = useState([]);
  const [filteredPrivateChats, setFilteredPrivateChats] =
    useState(dataUserChats);
  const [unreadRoomsCount, setUnreadRoomsCount] = useState(0);
  const [unreadDMsCount, setUnreadDMsCount] = useState(0);
  const [searchedValue, setSearchedValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const checkLogin = !isLoading && isUserLoggedIn && token;

  useEffect(() => {
    if (isUserLoggedIn && token) {
      setIsLoading(false);
    }
  }, [isUserLoggedIn, token]);

  const { responseData: roomsData } = useFetch(
    checkLogin ? URLs.getUserCountriesChats : null
  );
  const { responseData: dmsData } = useFetch(
    checkLogin ? URLs.getPrivateChats : null
  );

  useEffect(() => {
    if (roomsData) {
      setSubscriptionRooms(roomsData);
      const totalUnreadRooms = roomsData.reduce(
        (acc, room) => acc + room.unreadMessagesCount,
        0
      );
      setUnreadRoomsCount(totalUnreadRooms);
    }
  }, [roomsData]);

  useEffect(() => {
    if (dmsData) {
      const validChats = dmsData.filter(chat => chat.companion.id !== null);
      setDataUserChats(validChats);
      setFilteredPrivateChats(validChats);
      const totalUnreadDMs = validChats.reduce(
        (acc, chat) => acc + chat.chat.unreadMessagesCount,
        0
      );
      setUnreadDMsCount(totalUnreadDMs);
    }
  }, [dmsData]);

  const updateUserChats = async () => {
    try {
      const response = await axiosClient.get(URLs.getPrivateChats);
      const validChats = response.data.filter(
        chat => chat.companion && chat.companion.id !== null
      );
      setDataUserChats(validChats);
      setFilteredPrivateChats(validChats);
    } catch (error) {
      console.error('Error updating user chats:', error);
    }
  };

  const updateUnreadMessagesCount = useCallback(
    (chatId, unreadCount, isPrivate) => {
      if (isPrivate) {
        setDataUserChats(prevChats => {
          const updatedChats = prevChats.map(chat =>
            chat.chat.id === chatId
              ? {
                  ...chat,
                  chat: { ...chat.chat, unreadMessagesCount: unreadCount },
                }
              : chat
          );

          const totalUnreadDMs = updatedChats.reduce(
            (acc, chat) => acc + chat.chat.unreadMessagesCount,
            0
          );
          setUnreadDMsCount(totalUnreadDMs);
          setFilteredPrivateChats(updatedChats);
          return updatedChats;
        });
      } else {
        setSubscriptionRooms(prevRooms => {
          const updatedRooms = prevRooms.map(room =>
            room.id === chatId
              ? { ...room, unreadMessagesCount: unreadCount }
              : room
          );

          const totalUnreadRooms = updatedRooms.reduce(
            (acc, room) => acc + room.unreadMessagesCount,
            0
          );
          setUnreadRoomsCount(totalUnreadRooms);

          return updatedRooms;
        });
      }
    },
    []
  );
  const value = useMemo(
    () => ({
      subscriptionRooms,
      setSubscriptionRooms,
      dataUserChats,
      setDataUserChats,
      unreadRoomsCount,
      unreadDMsCount,
      updateUnreadMessagesCount,
      updateUserChats,
      filteredPrivateChats,
      setFilteredPrivateChats,
      searchedValue,
      setSearchedValue,
    }),
    [
      subscriptionRooms,
      dataUserChats,
      filteredPrivateChats,
      unreadRoomsCount,
      unreadDMsCount,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
