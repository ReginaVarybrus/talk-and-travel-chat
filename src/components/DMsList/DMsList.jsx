import SimpleBar from 'simplebar-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import ULRs from '@/redux-store/constants';
import { getUser } from '@/redux-store/selectors';
import { useFetch } from '@/hooks/useFetch';
import avatarImage from '@/images/Avatar.png';
import { Item, Avatar, ChatName, MessageDay } from './DMsListStyled';
import { ListStyled, Text, ListItems } from '../RoomsList/RoomsListStyled.js';
import 'simplebar-react/dist/simplebar.min.css';

const DMsList = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const userId = useSelector(getUser)?.id;

  const { setChatData } = useOutletContext();
  // console.log('selectedChat', selectedChat);
  // Получаем список чатов пользователя
  const { responseData: dataUserChats } = useFetch(
    ULRs.getPrivateChats(userId, '')
  );

  // Загружаем сообщения для выбранного чата
  const { responseData: fetchedMessages } = useFetch(
    selectedChat ? ULRs.getChatsMessages(selectedChat.chat.id, '') : null
  );

  useEffect(() => {
    if (fetchedMessages && selectedChat) {
      const messageWithType = fetchedMessages.content.map(message => ({
        ...message,
        type: 'TEXT',
      }));
      setChatData({
        id: selectedChat.chat.id,
        name: selectedChat.companion.userName,
        messages: messageWithType,
      });
    }
  }, [fetchedMessages, selectedChat, setChatData]);

  // console.log('fetchedMessages', fetchedMessages);

  const handleOpenChat = chatId => {
    const selectedChatData = dataUserChats.find(
      chat => chat.chat.id === chatId
    );
    if (selectedChatData) {
      setSelectedChat(selectedChatData);
    }
  };

  return (
    <ListStyled>
      {dataUserChats?.length ? (
        <ListItems>
          <SimpleBar style={{ maxHeight: 570 }}>
            {dataUserChats.map(({ chat, companion, lastReadMessageId }) => (
              <Item key={chat.id} onClick={() => handleOpenChat(chat.id)}>
                <Avatar>
                  <img src={avatarImage} alt="avatar" />
                </Avatar>
                <ChatName>
                  <h6>{companion.userName}</h6>
                  <p>{lastReadMessageId}</p>
                </ChatName>
                <MessageDay>
                  <p>{new Date(chat.creationDate).toLocaleDateString()}</p>
                </MessageDay>
              </Item>
            ))}
          </SimpleBar>
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
