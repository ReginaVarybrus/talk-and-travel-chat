import { Outlet } from 'react-router-dom';
import SideBar from '@/components/SideBar/SideBar';

import { DesktopLayoutStyled } from './DesktopLayoutStyled';

const DesktopLayout = () => (
  <DesktopLayoutStyled>
    <SideBar />
    <Outlet />
  </DesktopLayoutStyled>
);
export default DesktopLayout;
