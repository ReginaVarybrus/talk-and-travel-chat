import { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { device } from '@/constants/mediaQueries.js';
import ULRs from '@/redux-store/constants';
import { useFetch } from '@/hooks/useFetch';
import { dateStampConverter } from '@/components/utils/timeUtil.js';
import { ScrollBar } from '@/components/SearchInput/SearchInputStyled.js';
import {
  ListStyled,
  Text,
  ListItems,
} from '@/components/RoomsList/RoomsListStyled.js';
import {
  Item,
  ChatNameStyled,
  Avatar,
  ChatName,
  MessageDay,
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
  } = useOutletContext();

  const { responseData: dataUserChats } = useFetch(ULRs.getPrivateChats);

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
            {dataUserChats.map(({ chat, companion, lastReadMessageId }) => {
              const firstLetterOfName = companion.userName
                .substr(0, 1)
                .toUpperCase();

              return (
                <Item
                  key={chat.id}
                  onClick={() => handleOpenChat(chat.id, companion)}
                >
                  <ChatNameStyled>
                    <Avatar>{firstLetterOfName}</Avatar>
                    <ChatName>
                      <h6>{companion.userName}</h6>
                      <p>{lastReadMessageId}</p>
                    </ChatName>
                  </ChatNameStyled>
                  <MessageDay>
                    <p>{dateStampConverter(chat.creationDate)}</p>
                  </MessageDay>
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
