import React from 'react';
import { 
  Wrapper, 
  Text, 
  ListItems, 
  Item, 
  Avatar, 
  ChatName, 
  MessageDay 
} from './DMsListStyled';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function DMsList() {
  const chats = [];
  // const chats = [
  //   'Vitalii',
  //   'Olha',
  //   'Kostiantyn',
  //   'Kateryna',
  //   'Anton',
  //   'Regina',
  //   'Natali',
  //   'Oksana',
  //   'Yaroslava',
  // ];

  return (
    <Wrapper>
      {chats.length === 0 && (
        <Text>
          There are no chats in the list.
          <br /> Start a conversation and it will be shown here
        </Text>
      )}
      <ListItems>
        <SimpleBar style={{ maxHeight: 570 }}>
          {chats.map(name => (
            <Item key={name}>
              <Avatar>
                <img src="/images/Rectangle 2.jpg" alt="avatar" />
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
    </Wrapper>
  );
}
