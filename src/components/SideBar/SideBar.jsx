import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routesPath } from '@/routes/routesConfig';
import { getUser } from '@/redux-store/selectors';
import { useChatContext } from '@/providers/ChatProvider';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { logOut } from '@/redux-store/slices/AuthOperations';

import {
  SideBarStyled,
  ButtonsFrame,
  SideBarButton,
  ChatsButtonsFrame,
  Text,
  ImgAvatar,
  LetterAvatarStyled,
  RoomsIcon,
  DMsIcon,
  LogoutIcon,
  UnreadMessagesCount,
} from './SideBarStyled';

const SideBar = () => {
  const { userName, avatar } = useSelector(getUser) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;
  const { handleDeactivateStopmClient } = useWebSocket();

  const { unreadRoomsCount, unreadDMsCount } = useChatContext();

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
          {avatar ? (
            <ImgAvatar
              src={avatar.image50x50 || undefined}
              alt={`${userName}'s avatar`}
            />
          ) : (
            <LetterAvatarStyled>{userName[0].toUpperCase()}</LetterAvatarStyled>
          )}
          <Text>{userName}</Text>
        </SideBarButton>
        <ChatsButtonsFrame>
          <SideBarButton
            onClick={handleRoomsOpen}
            $isActive={currentPage === routesPath.ROOMS}
          >
            <RoomsIcon />
            <Text>Rooms</Text>
            {unreadRoomsCount > 0 && (
              <UnreadMessagesCount>{unreadRoomsCount}</UnreadMessagesCount>
            )}
          </SideBarButton>
          <SideBarButton
            onClick={handleDMsOpen}
            $isActive={currentPage === routesPath.DMS}
          >
            <DMsIcon />
            <Text>DMs</Text>
            {unreadDMsCount > 0 && (
              <UnreadMessagesCount>{unreadDMsCount}</UnreadMessagesCount>
            )}
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
