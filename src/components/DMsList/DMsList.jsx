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

  const { responseData: dataUserChats } = useFetch(
    ULRs.getPrivateChats(userId, '')
  );

  // Загружаем сообщения для выбранного чата
  const { responseData: dataChat } = useFetch(
    selectedChat ? ULRs.getChatsMessages(selectedChat, '') : null
  );

  useEffect(() => {
    if (dataChat) {
      setChatData(dataChat);
    }
  }, [setChatData, dataChat]);

  const handleOpenChat = chatId => {
    setSelectedChat(chatId);
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
