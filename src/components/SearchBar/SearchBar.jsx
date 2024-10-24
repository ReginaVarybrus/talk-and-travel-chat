import { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Outlet } from 'react-router-dom';
import SearchInput from '@/components/SearchInput/SearchInput';
import ChatMap from '@/components/ChatMap/ChatMap';
import { useChatContext } from '@/providers/ChatProvider';
import { SearchBarStyled, ButtonMapOpen, MapBox } from './SearchBarStyled';

const SearchBar = ({
  setChatData,
  setIsSubscribed,
  setIsShowJoinBtn,
  setSelectedCompanion,
  setParticipantsAmount,
  listOfOnlineUsers,
  isChatVisible,
  setIsChatVisible,
}) => {
  const [openMap, setOpenMap] = useState(false);
  const handleOpen = () => setOpenMap(true);
  const handleClose = () => setOpenMap(false);

  const { subscriptionRooms } = useChatContext();

  return (
    <SearchBarStyled $isChatVisible={isChatVisible}>
      <SearchInput
        setChatData={setChatData}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setIsChatVisible={setIsChatVisible}
        subscriptionRooms={subscriptionRooms}
        setParticipantsAmount={setParticipantsAmount}
      />
      <ButtonMapOpen onClick={handleOpen}>Search by map</ButtonMapOpen>
      <div>
        <Outlet
          context={{
            setChatData,
            subscriptionRooms,
            setIsSubscribed,
            setIsShowJoinBtn,
            setSelectedCompanion,
            setIsChatVisible,
            setParticipantsAmount,
            listOfOnlineUsers,
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
            <ChatMap
              openMap={openMap}
              closeMap={handleClose}
              setChatData={setChatData}
              setParticipantsAmount={setParticipantsAmount}
              setIsSubscribed={setIsSubscribed}
              subscriptionRooms={subscriptionRooms}
              setIsShowJoinBtn={setIsShowJoinBtn}
              setIsChatVisible={setIsChatVisible}
            />
          </MapBox>
        </Fade>
      </Modal>
    </SearchBarStyled>
  );
};

SearchBar.propTypes = {
  setChatData: PropTypes.func,
  setIsSubscribed: PropTypes.func,
  setIsShowJoinBtn: PropTypes.func,
  setSelectedCompanion: PropTypes.func,
  setParticipantsAmount: PropTypes.func,
  isChatVisible: PropTypes.bool,
  setIsChatVisible: PropTypes.func,
};

export default SearchBar;
