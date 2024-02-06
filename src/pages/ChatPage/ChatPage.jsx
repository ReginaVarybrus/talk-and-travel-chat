import React from 'react';
import { ChatWrapper } from './ChatPageStyled.js';
import Chat from 'components/Chat/Chat';

const ChatPage = () => {
  return (
    <ChatWrapper>
      <Chat />
    </ChatWrapper>
  );
};

export default ChatPage;

// TODO
// import logo from '../../public/logo.svg';
// <LogoBlock>
  // <Logo src={logo} alt="logo" />
  // <p>Please, select a room from room list to start using our platform</p>
// </LogoBlock> 
