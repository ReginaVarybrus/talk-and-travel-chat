// import { useState, useEffect, useRef } from 'react';
import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routesPath } from '@/routes/routesConfig';
import BottomNavigation from '@mui/material/BottomNavigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

import { RoomsIcon, DMsIcon } from '@/components/SideBar/SideBarStyled.js';
import { TapBarStyled, TapBarButton, MoreIcon } from './TapBarStyled.js';

const TapBar = ({ isChatVisible }) => {
  const location = useLocation();
  const currentPage = location.pathname;
  const ref = useRef(null);
  const navigate = useNavigate();

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
    <TapBarStyled sx={{ pb: 7 }} ref={ref} $isChatVisible={isChatVisible}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={value}>
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
            label="More"
            icon={<MoreIcon />}
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
