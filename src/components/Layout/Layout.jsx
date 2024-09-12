/* eslint-disable import/no-extraneous-dependencies */
// import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import WebSocketProvider from '@/providers/WebSocketProvider';
// import { LayoutStyled } from './LayoutStyled';
// import SideBar from '../SideBar/SideBar';

import { device } from '../../constants/mediaQueries.js'; // Імпортуємо файл з медіа-запитами
import DesktopLayout from '../DesktopLayout/DesktopLayout';
import MobileLayout from '../MobileLayout/MobileLayout';

const Layout = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });
  return (
    <WebSocketProvider>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
      {/* <LayoutStyled>
      <SideBar />
      <Outlet />
    </LayoutStyled> */}
    </WebSocketProvider>
  );
};

export default Layout;
