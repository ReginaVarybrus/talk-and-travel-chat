import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import io from 'socket.io-client';

import { Wrapper, ButtonMapOpen, MapBox } from './SearchBarStyled';
import SearchInput from '../SearchInput/SearchInput';
import DMsList from '../DMsList/DMsList';
import RoomsList from '../RoomsList/RoomsList';
import ChatMap from '../ChatMap/ChatMap';
import PropTypes from 'prop-types';

function SearchBar({ isOpen }) {
  const [openMap, setOpenMap] = useState(false);
  // const [socket, setSocket] = useState(null);
  // const [selectedCountryRooms, setSelectedCountryRooms] = useState([]);
  const handleOpen = () => setOpenMap(true);
  const handleClose = () => setOpenMap(false);

  // useEffect(() => {
  //   const socketInstance = io('#');

  //   socketInstance.on('updateRoomList', rooms => {
  //     setSelectedCountryRooms(rooms);
  //   });

  //   setSocket(socketInstance);

  //   return () => {
  //     socketInstance.disconnect();
  //   };
  // }, []);

  return (
    <Wrapper>
      <SearchInput 
      // socket={socket}
       />
      <ButtonMapOpen onClick={handleOpen}>Search by map</ButtonMapOpen>
      {/* <Text>
        There are no rooms in the list.
        <br /> Find chat of a country and it will be shown here
      </Text> */}
      {isOpen === 'component2' ? (
        <RoomsList 
        // rooms={selectedCountryRooms}
         />
      ) : (
        <DMsList />
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openMap}
        onClose={handleClose}
        // onClick={handleClose}
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
    </Wrapper>
  );
}

SearchBar.propTypes = {
  isOpen: PropTypes.string,
};

export default SearchBar;
