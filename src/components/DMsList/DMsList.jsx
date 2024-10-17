import { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import ULRs from '@/constants/constants';
import { useFetch } from '@/hooks/useFetch';
import { dateStampConverter } from '@/components/utils/timeUtil.js';
import { formatDate } from '@/components/utils/dateUtil.js';
import { ScrollBar } from '@/components/SearchInput/SearchInputStyled.js';
import {
  ListStyled,
  Text,
  ListItems,
} from '@/components/RoomsList/RoomsListStyled.js';
import { useChatContext } from '@/providers/ChatProvider';
import {
  Item,
  ChatNameStyled,
  Avatar,
  ChatName,
  BadgeStyled,
  NameAndDayBox,
  MessageAndCountBox,
  UnreadMessagesCount,
  CompanionName,
} from './DMsListStyled';

const DMsList = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  const [selectedChat, setSelectedChat] = useState(null);
  const location = useLocation();
  const { privateChatId, companionObject } = location.state || {};
  const {
    setChatData,
    setIsSubscribed,
    setSelectedCompanion,
    setIsChatVisible,
    listOfOnlineUsers,
  } = useOutletContext();

  const { dataUserChats } = useChatContext();

  const { responseData: dataChat } = useFetch(
    selectedChat ? ULRs.getChat(selectedChat) : null
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
      {dataUserChats?.length ? (
        <ListItems>
          <ScrollBar>
            {dataUserChats
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
                const isOnline =
                  listOfOnlineUsers.get(companion.id.toString()) === true;

                return (
                  <Item
                    key={chat.id}
                    onClick={() => handleOpenChat(chat.id, companion)}
                    $isActive={selectedChat && chat.id === selectedChat}
                  >
                    <ChatNameStyled>
                      <Avatar>
                        {companion.userName[0].toUpperCase()}
                        {isOnline && <BadgeStyled />}
                      </Avatar>
                      <ChatName>
                        <NameAndDayBox>
                          <CompanionName
                            $isActive={selectedChat && chat.id === selectedChat}
                          >
                            {companion.userName}
                          </CompanionName>
                          <p>
                            {lastMessage &&
                              formatDate(lastMessage.creationDate)}
                          </p>
                        </NameAndDayBox>
                        <MessageAndCountBox>
                          <p>{lastMessage && lastMessage.content}</p>
                          {chat.unreadMessagesCount > 0 && (
                            <UnreadMessagesCount
                              $isActive={
                                selectedChat && chat.id === selectedChat
                              }
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
          </ScrollBar>
        </ListItems>
      ) : (
        <Text>
          There are no chats in the list.
          <br /> Start a conversation and it will be shown here
        </Text>
      )}
    </ListStyled>
  );
};

export default DMsList;
