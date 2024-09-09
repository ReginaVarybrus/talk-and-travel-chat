import { Outlet } from 'react-router-dom';
import WebSocketProvider from '@/providers/WebSocketProvider';
import { LayoutStyled } from './LayoutStyled';
import SideBar from '../SideBar/SideBar';

const Layout = () => (
  <WebSocketProvider>
    <LayoutStyled>
      <SideBar />
      <Outlet />
    </LayoutStyled>
  </WebSocketProvider>
);

export default Layout;
