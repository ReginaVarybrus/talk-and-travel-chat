import { Outlet } from 'react-router-dom';
import { WebSocketProvider } from '@/provider/WebSocketProvider.jsx';
import SideBar from '@/components/SideBar/SideBar';
import { LayoutStyled } from './LayoutStyled';

const Layout = () => (
  <WebSocketProvider url={`${import.meta.env.VITE_APP_API_WS_URL}/ws/`}>
    <LayoutStyled>
      <SideBar />
      <Outlet />
    </LayoutStyled>
  </WebSocketProvider>
);

export default Layout;
