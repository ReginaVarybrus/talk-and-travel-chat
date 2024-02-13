import React from 'react';
import SimpleBar from 'simplebar-react';
import {
  Wrapper,
  Text,
  ListItems,
  Item,
  Avatar,
  ChatName,
  MessageDay,
} from './DMsListStyled';
import 'simplebar-react/dist/simplebar.min.css';

function DMsList() {
  const chats = [];

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

export default DMsList;
