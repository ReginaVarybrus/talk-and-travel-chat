import React from 'react';
import { useState } from 'react';
import {
  Container,
  ChatWrapper,
  // Logo
} from './ChatPageStyled.js';

import SideBar from 'components/SideBar/SideBar';
import SearchBar from 'components/SearchBar/SearchBar';
import Chat from 'components/Chat/Chat';

// import logo from '../../images/logo.svg';

export default function ChatPage() {
  const [activeComponent, setActiveComponent] = useState('component1');

  const handleDmsListOpen = () => {
    setActiveComponent('component1');
    console.log('DMs', activeComponent);
  };

  const handleRoomsListOpen = () => {
    setActiveComponent('component2');
    console.log('Rooms', activeComponent);
  };

  // const handleSidebarOpen = () => {
  //   if (window.innerWidth >= 1920) {
  //     return;
  //   }
  //   setSidebarOpen(!sidebarOpen);
  // };

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
    <Container>
      <SideBar
        onClickDms={handleDmsListOpen}
        onClickRooms={handleRoomsListOpen}
        isActive={activeComponent}
      />
      {/* <SideBar isOpen={sidebarOpen} onCloseClick={handleSidebarOpen}/> */}
      <SearchBar isOpen={activeComponent} />
      <ChatWrapper>
        {/* <Logo src={logo} alt="logo" />
        <p>Please, select a room from room list to start using our platform</p> */}
        <Chat />
      </ChatWrapper>
    </Container>
  );
}
