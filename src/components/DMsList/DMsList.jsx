import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import URLs from '@/constants/constants';
import { useFetch } from '@/hooks/useFetch';
import { formatDate } from '@/components/utils/dateUtil.js';
import { getUsersStatuses } from '@/redux-store/selectors.js';
import {
  ListStyled,
  Text,
  ListItemsStyled,
} from '@/components/RoomsList/RoomsListStyled.js';
import { useChatContext } from '@/providers/ChatProvider';
import {
  LetterAvatarStyled,
  Badge,
} from '@/components/MessageItem/MessageItemStyled';
import {
  Item,
  ChatNameStyled,
  Avatar,
  ImgAvatar,
  ChatName,
  NameAndDayBox,
  MessageAndCountBox,
  UnreadMessagesCount,
  CompanionName,
} from './DMsListStyled';

const DMsList = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const [selectedChat, setSelectedChat] = useState(null);
  const usersStatuses = useSelector(getUsersStatuses);
  const location = useLocation();
  const { privateChatId, companionObject } = location.state || {};
  const {
    setChatData,
    setIsSubscribed,
    setSelectedCompanion,
    setIsChatVisible,
  } = useOutletContext();

  const { filteredPrivateChats, searchedValue } = useChatContext();

  const { responseData: dataChat } = useFetch(
    selectedChat ? URLs.getChat(selectedChat) : null
  );

  useEffect(() => {
    if (privateChatId) {
      setSelectedChat(privateChatId);
      setSelectedCompanion(companionObject);
    }
  }, [privateChatId]);

  useEffect(() => {
    if (dataChat) {
      setChatData(dataChat);
      setIsSubscribed(true);
    }
  }, [setChatData, dataChat, setIsSubscribed]);

  const handleOpenChat = (chatId, companion) => {
    setSelectedChat(chatId);
    setSelectedCompanion(companion);
    if (!isDesktop) {
      setIsChatVisible(true);
    }
  };

  return (
    <ListStyled>
      {filteredPrivateChats.length ? (
        <ListItemsStyled>
          {filteredPrivateChats
            .sort((a, b) => {
              const dateA = a.lastMessage
                ? new Date(a.lastMessage.creationDate)
                : new Date(0);
              const dateB = b.lastMessage
                ? new Date(b.lastMessage.creationDate)
                : new Date(0);
              return dateB - dateA;
            })
            .map(({ chat, companion, lastMessage }) => {
              const userStatus = usersStatuses.find(
                user => user.userId === companion.id
              );

              const isOnline = userStatus ? userStatus.status.isOnline : false;

              return (
                <Item
                  key={chat.id}
                  onClick={() => handleOpenChat(chat.id, companion)}
                  $isActive={selectedChat && chat.id === selectedChat}
                >
                  <ChatNameStyled>
                    <Avatar>
                      {companion.avatar ? (
                        <ImgAvatar
                          src={
                            `${companion.avatar?.image50x50}?lastmod=${new Date().getTime()}` ||
                            undefined
                          }
                          alt={`${companion.userName}'s avatar`}
                        />
                      ) : (
                        <LetterAvatarStyled>
                          {companion.userName[0].toUpperCase()}
                        </LetterAvatarStyled>
                      )}
                      {isOnline && <Badge />}
                    </Avatar>
                    <ChatName>
                      <NameAndDayBox>
                        <CompanionName
                          $isActive={selectedChat && chat.id === selectedChat}
                        >
                          {companion.userName}
                        </CompanionName>
                        <p>
                          {lastMessage && formatDate(lastMessage.creationDate)}
                        </p>
                      </NameAndDayBox>
                      <MessageAndCountBox>
                        <p>{lastMessage && lastMessage.content}</p>
                        {chat.unreadMessagesCount > 0 && (
                          <UnreadMessagesCount
                            $isActive={selectedChat && chat.id === selectedChat}
                          >
                            {chat.unreadMessagesCount}
                          </UnreadMessagesCount>
                        )}
                      </MessageAndCountBox>
                    </ChatName>
                  </ChatNameStyled>
                </Item>
              );
            })}
        </ListItemsStyled>
      ) : (
        <Text>
          {searchedValue
            ? 'No contacts found with this name'
            : 'There are no chats in the list. Start a conversation and it will be shown here'}
        </Text>
      )}
    </ListStyled>
  );
};

export default DMsList;
