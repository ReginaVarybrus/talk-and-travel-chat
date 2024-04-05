import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { routesPath } from '@/routes/routesConfig';
import { getUserName } from '@/redux-store/AuthOperations/selectors';
import { logOut } from '@/redux-store/AuthOperations/AuthOperations';
import { Wrapper, ProfileBox, LogOutBox, Frame } from './SideBarStyled';
import SideBarItem from '../SideBarItem/SideBarItem';

const SideBar = () => {
  const userName = useSelector(getUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;

  const handleProfileOpen = () => {
    navigate(routesPath.ACCOUNT);
  };

  const handleRoomsOpen = () => {
    navigate(routesPath.ROOMS);
  };

  const handleDMsOpen = () => {
    navigate(routesPath.DMS);
  };

  const handleLogOut = (event, values) => {
    dispatch(logOut(values));
    navigate(routesPath.MAIN);
  };

  return (
    <Wrapper>
      <ProfileBox>
        <SideBarItem
          onClick={handleProfileOpen}
          isActive={currentPage === routesPath.ACCOUNT}
          alt="Photo icon"
          name="photo-icon"
          size="24"
        >
          {userName}
        </SideBarItem>
      </ProfileBox>
      <Frame>
        <SideBarItem
          onClick={handleRoomsOpen}
          isActive={currentPage === routesPath.ROOMS}
          alt="Rooms icon"
          name="rooms"
          size="24"
        >
          Rooms
        </SideBarItem>
        <SideBarItem
          onClick={handleDMsOpen}
          isActive={currentPage === routesPath.DMS}
          alt="DMs icon"
          name="dms"
          size="24"
        >
          DMs
        </SideBarItem>
      </Frame>
      <LogOutBox>
        <SideBarItem
          onClick={handleLogOut}
          alt="Logout icon"
          name="logout"
          size="24"
        >
          LogOut
        </SideBarItem>
      </LogOutBox>
    </Wrapper>
  );
};

export default SideBar;
