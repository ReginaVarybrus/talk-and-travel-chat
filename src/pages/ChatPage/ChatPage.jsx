import React from 'react';
// import { useState } from 'react';
import { 
  ChatWrapper, 
  // LogoBlock, 
  // Logo 
} from './ChatPageStyled.js';

import Chat from 'components/Chat/Chat';

// import logo from '../../public/logo.svg';

export default function ChatPage() {
  // useEffect(() => {
  //   const handleResize = () => {
  //     setSidebarOpen(window.innerWidth >= 1920);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <ChatWrapper>
      {/* <LogoBlock>
        <Logo src={logo} alt="logo" />
        <p>Please, select a room from room list to start using our platform</p>
      </LogoBlock> */}
      <Chat />
    </ChatWrapper>
  );
}
