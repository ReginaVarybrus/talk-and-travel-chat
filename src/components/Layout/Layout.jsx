import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '@/components/SideBar/SideBar';
import TapBar from '@/components/TapBar/TapBar';
import { LayoutStyled } from './LayoutStyled';

const Layout = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

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
