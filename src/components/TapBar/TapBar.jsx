import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { routesPath } from '@/routes/routesConfig';
import BottomNavigation from '@mui/material/BottomNavigation';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

import { RoomsIcon, DMsIcon } from '@/components/SideBar/SideBarStyled.js';
import { TapBarStyled, TapBarButton, MoreIcon } from './TapBarStyled.js';

const TapBar = ({ isChatVisible }) => {
  const location = useLocation();
  const currentPage = location.pathname;
  const [value, setValue] = useState(1);
  const ref = useRef(null);
  const navigate = useNavigate();

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
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
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

export default TapBar;
