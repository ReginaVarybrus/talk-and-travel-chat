import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutStyled } from './LayoutStyled';
import SideBar from '../SideBar/SideBar';

const Layout = () => {
  return (
    <>
      <LayoutStyled>
        <SideBar />
        <Outlet />
      </LayoutStyled>
    </>
  );
};

export default Layout;
