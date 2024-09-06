import { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Outlet } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
import ChatMap from '../ChatMap/ChatMap';
import { SearchBarStyled, ButtonMapOpen, MapBox } from './SearchBarStyled';

const SearchBar = ({
  setCountryData,
  subscriptionCountryRooms,
  isSubscribed,
  setIsSubscribed,
  setIsShowJoinBtn,
}) => {
  const [openMap, setOpenMap] = useState(false);
  const handleOpen = () => setOpenMap(true);
  const handleClose = () => setOpenMap(false);

  return (
    <SearchBarStyled>
      <SearchInput
        setCountryData={setCountryData}
        subscriptionCountryRooms={subscriptionCountryRooms}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />
      <ButtonMapOpen onClick={handleOpen}>Search by map</ButtonMapOpen>
      <div>
        <Outlet
          context={{
            setCountryData,
            subscriptionCountryRooms,
            isSubscribed,
            setIsSubscribed,
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

SearchBar.propTypes = {
  setCountryData: PropTypes.func,
  subscriptionCountryRooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      flagCode: PropTypes.string,
    })
  ),
  isSubscribed: PropTypes.bool,
  setIsSubscribed: PropTypes.func,
  setIsShowJoinBtn: PropTypes.func,
};

export default SearchBar;
