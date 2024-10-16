import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routesPath } from '@/routes/routesConfig';
import { getUser } from '@/redux-store/selectors';
import { logOut } from '@/redux-store/AuthOperations/AuthOperations';
import { useWebSocket } from '@/hooks/useWebSocket';

import {
  SideBarStyled,
  ButtonsFrame,
  SideBarButton,
  ChatsButtonsFrame,
  Text,
  UserIcon,
  RoomsIcon,
  DMsIcon,
  LogoutIcon,
} from './SideBarStyled';

const SideBar = () => {
  const { userName } = useSelector(getUser) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;
  const { handleDeactivateStopmClient } = useWebSocket();

  const handleProfileOpen = () => {
    navigate(routesPath.ACCOUNT);
  };

  const handleRoomsOpen = () => {
    navigate(routesPath.ROOMS);
  };

  const handleDMsOpen = () => {
    navigate(routesPath.DMS);
  };

  const handleLogOut = async () => {
    try {
      handleDeactivateStopmClient();
      await dispatch(logOut());
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <SideBarStyled>
      <ButtonsFrame>
        <SideBarButton
          onClick={handleProfileOpen}
          $isActive={currentPage === routesPath.ACCOUNT}
        >
          <UserIcon />
          <Text>{userName}</Text>
        </SideBarButton>
        <ChatsButtonsFrame>
          <SideBarButton
            onClick={handleRoomsOpen}
            $isActive={currentPage === routesPath.ROOMS}
          >
            <RoomsIcon />
            <Text>Rooms</Text>
          </SideBarButton>
          <SideBarButton
            onClick={handleDMsOpen}
            $isActive={currentPage === routesPath.DMS}
          >
            <DMsIcon />
            <Text>DMs</Text>
          </SideBarButton>
        </ChatsButtonsFrame>
        <SideBarButton onClick={handleLogOut}>
          <LogoutIcon />
          <Text>LogOut</Text>
        </SideBarButton>
      </ButtonsFrame>
    </SideBarStyled>
  );
};

export default SideBar;
