import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { Outlet } from 'react-router-dom';
import { SearchBarStyled, ButtonMapOpen, MapBox } from './SearchBarStyled';
import SearchInput from '../SearchInput/SearchInput';
import ChatMap from '../ChatMap/ChatMap';

const SearchBar = ({
  onCountryRoomDataReceived,
  subscriptionCountryRooms,
  setSubscriptionCountryRooms,
}) => {
  const [openMap, setOpenMap] = useState(false);
  const handleOpen = () => setOpenMap(true);
  const handleClose = () => setOpenMap(false);

  return (
    <SearchBarStyled>
      <SearchInput onCountryRoomDataReceived={onCountryRoomDataReceived} />
      <ButtonMapOpen onClick={handleOpen}>Search by map</ButtonMapOpen>
      <div>
        <Outlet
          context={{
            onCountryRoomDataReceived,
            subscriptionCountryRooms,
            setSubscriptionCountryRooms,
          }}
        />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openMap}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openMap}>
          <MapBox>
            <ChatMap closeMap={handleClose} />
          </MapBox>
        </Fade>
      </Modal>
    </SearchBarStyled>
  );
};

export default SearchBar;
