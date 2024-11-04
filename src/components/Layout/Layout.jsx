import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import URLs from '@/constants/constants';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import useUserActivity from '@/hooks/useUserActivity.js';
import SideBar from '@/components/SideBar/SideBar';
import TapBar from '@/components/TapBar/TapBar';
import { LayoutStyled } from './LayoutStyled';

const Layout = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const { sendMessageOrEvent } = useWebSocket();

  const handleUserActiveEvent = status => {
    console.log('handle event sended online status', status);
    sendMessageOrEvent(status, URLs.updateOnlineStatus);
  };

  useUserActivity(handleUserActiveEvent);

  return (
    <LayoutStyled>
      <SideBar />
      <Outlet
        context={{
          isChatVisible,
          setIsChatVisible,
        }}
      />
      <TapBar isChatVisible={isChatVisible} />
    </LayoutStyled>
  );
};

export default Layout;
