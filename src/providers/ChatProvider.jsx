import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useFetch } from '@/hooks/useFetch';
import ULRs from '@/constants/constants';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [subscriptionRooms, setSubscriptionRooms] = useState([]);
  const [dataUserChats, setDataUserChats] = useState([]);
  const [unreadRoomsCount, setUnreadRoomsCount] = useState(0);
  const [unreadDMsCount, setUnreadDMsCount] = useState(0);

  const { responseData: roomsData } = useFetch(ULRs.userCountries);
  const { responseData: dmsData } = useFetch(ULRs.getPrivateChats);

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
      setDataUserChats(dmsData);
      const totalUnreadDMs = dmsData.reduce(
        (acc, chat) => acc + chat.chat.unreadMessagesCount,
        0
      );
      setUnreadDMsCount(totalUnreadDMs);
    }
  }, [dmsData]);

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
      dataUserChats,
      unreadRoomsCount,
      unreadDMsCount,
      updateUnreadMessagesCount,
    }),
    [subscriptionRooms, dataUserChats, unreadRoomsCount, unreadDMsCount]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
