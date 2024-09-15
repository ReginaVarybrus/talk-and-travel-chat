import SimpleBar from 'simplebar-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import ULRs from '@/redux-store/constants';
import { getUser } from '@/redux-store/selectors';
import { useFetch } from '@/hooks/useFetch';
import avatarImage from '@/images/Avatar.png';
// import { timeStampConverter } from '../utils/timeUtil';
import { Item, Avatar, ChatName, MessageDay } from './DMsListStyled';
import { ListStyled, Text, ListItems } from '../RoomsList/RoomsListStyled.js';
import 'simplebar-react/dist/simplebar.min.css';

const DMsList = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const userId = useSelector(getUser)?.id;
  const location = useLocation();
  const { privateChatId, companionObject } = location.state || {};
  const { setChatData, setIsSubscribed, setSelectedCompanion } =
    useOutletContext();

  const { responseData: dataUserChats } = useFetch(
    ULRs.getPrivateChats(userId, '')
  );

  const { responseData: dataChat } = useFetch(
    selectedChat ? ULRs.getChatsMessages(selectedChat, '') : null
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
  };

  return (
    <ListStyled>
      {dataUserChats?.length ? (
        <ListItems>
          <SimpleBar style={{ maxHeight: 570 }}>
            {dataUserChats.map(({ chat, companion, lastReadMessageId }) => (
              <Item
                key={chat.id}
                onClick={() => handleOpenChat(chat.id, companion)}
              >
                <Avatar>
                  <img src={avatarImage} alt="avatar" />
                </Avatar>
                <ChatName>
                  <h6>{companion.userName}</h6>
                  <p>{lastReadMessageId}</p>
                </ChatName>
                <MessageDay>
                  <p>{new Date(chat.creationDate).toLocaleDateString()}</p>
                  {/* add day of last message instead of creationDate */}
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
