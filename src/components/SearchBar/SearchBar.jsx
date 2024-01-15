import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { Wrapper, Text, ButtonMapOpen, MapBox } from './SearchBarStyled';
import SearchInput from '../SearchInput/SearchInput';
import DMsList from '../DMsList/DMsList';
import RoomsList from '../RoomsList/RoomsList';
import ChatMap from '../ChatMap/ChatMap';
import PropTypes from 'prop-types';

function SearchBar({isOpen}) {
  const [openMap, setOpenMap] = useState(false);
  const handleOpen = () => setOpenMap(true);
  const handleClose = () => setOpenMap(false);

  return (
    <Wrapper>
      <SearchInput />
      <ButtonMapOpen onClick={handleOpen}>Search by map</ButtonMapOpen>
      <Text>
        There are no rooms in the list.
        <br /> Find chat of a country and it will be shown here
      </Text>
      {isOpen === 'component1' ? <DMsList /> : <RoomsList />}
      
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
            <ChatMap />
          </MapBox>
        </Fade>
      </Modal>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  isOpen: PropTypes.string,
};

export default SearchBar;
