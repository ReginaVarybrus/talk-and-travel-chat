import SimpleBar from 'simplebar-react';
import { Item, Avatar, ChatName, MessageDay } from './DMsListStyled';
import { ListStyled, Text, ListItems } from '../RoomsList/RoomsListStyled.js';
import 'simplebar-react/dist/simplebar.min.css';
import avatarImage from '../../../public/img/Avatar.png';

const DMsList = () => {
  const chats = ['Anya', 'Vasya'];

  return (
    <ListStyled>
      {chats?.length ? (
        <ListItems>
          <SimpleBar style={{ maxHeight: 570 }}>
            {chats.map(name => (
              <Item key={name}>
                <Avatar>
                  <img src={avatarImage} alt="avatar" />
                </Avatar>
                <ChatName>
                  <h6>{name}</h6>
                  <p>It is trash</p>
                </ChatName>
                <MessageDay>
                  <p>Thu</p>
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
