import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import SideBar from 'components/SideBar/SideBar';
import SearchBar from 'components/SearchBar/SearchBar';
import Loader from 'components/Loader/Loader';
import { Wrapper } from './LayoutStyled';

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState('component2');

  const handleDmsListOpen = () => {
    setActiveComponent('component1');
  };

  const handleRoomsListOpen = () => {
    setActiveComponent('component2');
  };

  return (
    <Wrapper>
      <Suspense fallback={<Loader />}>
        <SideBar
          onClickDms={handleDmsListOpen}
          onClickRooms={handleRoomsListOpen}
          isActive={activeComponent}
        />
        <SearchBar isOpen={activeComponent} />
        <Outlet />
      </Suspense>
    </Wrapper>
  );
};

export default Layout;
