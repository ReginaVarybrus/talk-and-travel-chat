import { useMediaQuery } from 'react-responsive';
import WebSocketProvider from '@/providers/WebSocketProvider';
import { device } from '@/constants/mediaQueries.js';
import DesktopLayout from '@/components/DesktopLayout/DesktopLayout';
import MobileLayout from '@/components/MobileLayout/MobileLayout';

const Layout = () => {
  const isDesktop = useMediaQuery({ query: device.tablet });

  return (
    <WebSocketProvider>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
    </WebSocketProvider>
  );
};

export default Layout;
