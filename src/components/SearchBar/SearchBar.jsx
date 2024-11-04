import { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Outlet, useLocation } from 'react-router-dom';
import SearchInput from '@/components/SearchInput/SearchInput';
import ChatMap from '@/components/ChatMap/ChatMap';
import { useChatContext } from '@/providers/ChatProvider';
import { SearchBarStyled, ButtonMapOpen, MapBox } from './SearchBarStyled';
import SearchInputDMs from '../SearchInputDMs/SearchInputDMs';
import AllUsersModal from '../AllUsersModal/AllUsersModal';

const SearchBar = ({
  setChatData,
  setIsSubscribed,
  setIsShowJoinBtn,
  setSelectedCompanion,
  setParticipantsAmount,
  listOfOnlineUsersStatuses,
  isChatVisible,
  setIsChatVisible,
}) => {
  const location = useLocation();
  const isRoomRoute = location.pathname.includes('/rooms-chat');
  const [openMap, setOpenMap] = useState(false);
  const handleOpenMap = () => setOpenMap(true);
  const handleCloseMap = () => setOpenMap(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { subscriptionRooms } = useChatContext();

  return (
    <SearchBarStyled $isChatVisible={isChatVisible}>
      {isRoomRoute ? (
        <>
          <SearchInput
            setChatData={setChatData}
            setIsSubscribed={setIsSubscribed}
            setIsShowJoinBtn={setIsShowJoinBtn}
            setIsChatVisible={setIsChatVisible}
            subscriptionRooms={subscriptionRooms}
            setParticipantsAmount={setParticipantsAmount}
          />
          <ButtonMapOpen onClick={handleOpenMap}>Search by map</ButtonMapOpen>
        </>
      ) : (
        <>
          <SearchInputDMs />

          <ButtonMapOpen onClick={handleOpenModal}>
            Search new companion
          </ButtonMapOpen>
        </>
      )}
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
            listOfOnlineUsersStatuses,
          }}
        />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openMap}
        onClose={handleCloseMap}
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
              closeMap={handleCloseMap}
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

      <AllUsersModal isOpen={openModal} onClose={handleCloseModal} />
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
