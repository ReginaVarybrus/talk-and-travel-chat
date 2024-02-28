import { Outlet } from 'react-router-dom';
import { LayoutStyled } from './LayoutStyled';
import SideBar from '../SideBar/SideBar';

const Layout = () => (
  <LayoutStyled>
    <SideBar />
    <Outlet />
  </LayoutStyled>
);

export default Layout;
