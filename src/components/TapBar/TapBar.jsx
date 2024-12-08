import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routesPath } from '@/routes/routesConfig';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import BottomNavigation from '@mui/material/BottomNavigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

import {
  RoomsIcon,
  DMsIcon,
  ImgAvatar,
  LetterAvatarStyled,
} from '@/components/SideBar/SideBarStyled.js';
import { TapBarStyled, TapBarButton } from './TapBarStyled.js';

const TapBar = ({ isChatVisible }) => {
  const location = useLocation();
  const currentPage = location.pathname;
  const ref = useRef(null);
  const navigate = useNavigate();
  const { userName, avatar } = useSelector(getUser) || {};

  const getValueByRoute = route => {
    switch (route) {
      case routesPath.DMS:
        return 0;
      case routesPath.ROOMS:
        return 1;
      case routesPath.ACCOUNT:
        return 2;
      default:
        return 1;
    }
  };

  const value = getValueByRoute(currentPage);

  const handleProfileOpen = () => {
    navigate(routesPath.ACCOUNT);
  };

  const handleRoomsOpen = () => {
    navigate(routesPath.ROOMS);
  };

  const handleDMsOpen = () => {
    navigate(routesPath.DMS);
  };

  return (
    <TapBarStyled ref={ref} $isChatVisible={isChatVisible}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation sx={{ height: '100px' }} showLabels value={value}>
          <TapBarButton
            label="DMs"
            icon={<DMsIcon />}
            sx={{ flexDirection: 'row' }}
            onClick={handleDMsOpen}
            $isActive={currentPage === routesPath.DMS}
          />
          <TapBarButton
            label="Rooms"
            icon={<RoomsIcon />}
            sx={{ flexDirection: 'row' }}
            onClick={handleRoomsOpen}
            $isActive={currentPage === routesPath.ROOMS}
          />
          <TapBarButton
            icon={
              avatar?.image50x50 ? (
                <ImgAvatar
                  src={avatar?.image50x50 || undefined}
                  alt={`${userName}'s avatar`}
                />
              ) : (
                <LetterAvatarStyled>
                  {userName[0].toUpperCase()}
                </LetterAvatarStyled>
              )
            }
            sx={{ flexDirection: 'row' }}
            onClick={handleProfileOpen}
            $isActive={currentPage === routesPath.ACCOUNT}
          />
        </BottomNavigation>
      </Paper>
    </TapBarStyled>
  );
};

TapBar.propTypes = {
  isChatVisible: PropTypes.bool,
};

export default TapBar;
