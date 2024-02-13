import { Outlet } from 'react-router-dom';
import { LayoutStyled } from './LayoutStyled';
import SideBar from '../SideBar/SideBar';

function Layout() {
  return (
    <LayoutStyled>
        <SideBar />
        <Outlet />
      </LayoutStyled>
  );
}

export default Layout;
