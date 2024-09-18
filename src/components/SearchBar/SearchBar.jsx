import { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Outlet, useOutletContext } from 'react-router-dom';
import SearchInput from '@/components/SearchInput/SearchInput';
import ChatMap from '@/components/ChatMap/ChatMap';
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
  const context = useOutletContext();
  const isChatVisible = context?.isChatVisible;
  const setIsChatVisible = context?.setIsChatVisible;

  return (
    <SearchBarStyled $isChatVisible={isChatVisible}>
      <SearchInput
        chatId={chatId}
        setChatData={setChatData}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsChatVisible={setIsChatVisible}
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
            setIsChatVisible,
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
