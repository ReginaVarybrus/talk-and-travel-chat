import { Outlet } from 'react-router-dom';
import { DesktopLayoutStyled } from './DesktopLayoutStyled';
import SideBar from '../SideBar/SideBar';

const DesktopLayout = () => (
  <DesktopLayoutStyled>
    <SideBar />
    <Outlet />
  </DesktopLayoutStyled>
);

export default DesktopLayout;
