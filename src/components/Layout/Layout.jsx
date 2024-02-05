import { Outlet } from 'react-router-dom';

// import ChatPage from '../../pages/ChatPage/ChatPage';
import SideBar from 'components/SideBar/SideBar';
import SearchBar from 'components/SearchBar/SearchBar';
// import Chat from 'components/Chat/Chat';
import { Suspense } from 'react';
import { Wrapper } from './LayoutStyled';
import { useState } from 'react';

import Loader from 'components/Loader/Loader';

export default function Layout() {
  const [activeComponent, setActiveComponent] = useState('component2');

  const handleDmsListOpen = () => {
    setActiveComponent('component1');
    console.log('DMs', activeComponent);
  };

  const handleRoomsListOpen = () => {
    setActiveComponent('component2');
    console.log('Rooms', activeComponent);
  };
  // const [chatOpen, setChatOpen] = useState(window.innerWidth >= 1920);

  // const handleChatOpen = () => {
  //   if (window.innerWidth >= 1920) {
  //     return;
  //   }
  //   setChatOpen(!chatOpen);
  // };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setChatOpen(window.innerWidth >= 1920);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <>
      {/* <SideBar isOpen={sidebarOpen} onCloseClick={handleSidebarOpen} />
        <SearchBar />*/}
      {/* <ChatPage isOpen={chatOpen} onCloseClick={handleChatOpen}/> */}
      <Wrapper>
        <Suspense fallback={<Loader />}>
          <SideBar
            onClickDms={handleDmsListOpen}
            onClickRooms={handleRoomsListOpen}
            isActive={activeComponent}
          />
          <SearchBar isOpen={activeComponent} />
          <Outlet />
        </Suspense>
      </Wrapper>
    </>
  );
}
