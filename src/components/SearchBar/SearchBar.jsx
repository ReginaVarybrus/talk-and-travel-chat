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
  chatId,
  setChatData,
  subscriptionRooms,
  setSubscriptionRooms,
  isSubscribed,
  setIsSubscribed,
  setIsShowJoinBtn,
  selectedCompanion,
  setSelectedCompanion,
}) => {
  const [openMap, setOpenMap] = useState(false);
  const handleOpen = () => setOpenMap(true);
  const handleClose = () => setOpenMap(false);

  return (
    <SearchBarStyled>
      <SearchInput
        chatId={chatId}
        setChatData={setChatData}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
      />
      <ButtonMapOpen onClick={handleOpen}>Search by map</ButtonMapOpen>
      <div>
        <Outlet
          context={{
            setChatData,
            subscriptionRooms,
            setSubscriptionRooms,
            isSubscribed,
            setIsSubscribed,
            setIsShowJoinBtn,
            selectedCompanion,
            setSelectedCompanion,
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
  setChatData: PropTypes.func,
  subscriptionRooms: PropTypes.array,
  setIsSubscribed: PropTypes.func,
  setIsShowJoinBtn: PropTypes.func,
};

export default SearchBar;
