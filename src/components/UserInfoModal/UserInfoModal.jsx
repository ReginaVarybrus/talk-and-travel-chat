import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { SignUpBtn } from '@/routes/RegisterRoute/RegisterRouteStyled';
import PropTypes from 'prop-types';
import URLs from '@/constants/constants';
import { axiosClient } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { routesPath } from '@/routes/routesConfig';
import { useChatContext } from '@/providers/ChatProvider';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { CloseBtn } from '@/components/CountryInfo/CountryInfoStyled.js';
import {
  ModalWindowStyled,
  InfoModalStyled,
  UserContactInfoStyled,
  ModalAvatar,
  LetterAvatarStyled,
  UserInfo,
  AboutUser,
  InfoIcon,
  ButtonBlock,
  ButtonLeave,
  ConfirmBlock,
  ConfirmModalStyled,
} from './UserInfoModalStyled';

const UserInfoModal = ({
  open,
  handleClose,
  userAvatarUrl,
  userName = 'User name',
  userEmail = 'email@gmail.com',
  about,
  id,
  isPrivateChat,
  chatId,
  setChatData,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { sendMessageOrEvent } = useWebSocket();

  const {
    dataUserChats,
    updateUserChats,

    setFilteredPrivateChats,
  } = useChatContext();

  const openConfirmation = () => {
    setConfirmOpen(true);
    document.activeElement?.blur();
  };

  const closeConfirmation = () => {
    setConfirmOpen(false);
    document.activeElement?.blur();
  };

  const checkExistingPrivateChat = companionId => {
    const validChats = dataUserChats.filter(chat => chat.companion.id !== null);
    const isExist = validChats?.find(chat => chat.companion.id === companionId);
    return isExist ? isExist.chat.id : null;
  };

  const handleCreatePrivateChat = async companionId => {
    try {
      const existingChatId = checkExistingPrivateChat(companionId);

      if (existingChatId) {
        navigate(routesPath.DMS, {
          state: {
            privateChatId: existingChatId,
            companionObject: { id: companionId, userName, userEmail },
          },
        });
      } else {
        const response = await axiosClient.post(URLs.createPrivateChat, {
          companionId,
        });
        const privateChatId = response.data;
        await updateUserChats();
        navigate(routesPath.DMS, {
          state: {
            privateChatId,
            companionObject: { id: companionId, userName, userEmail },
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveGroup = () => {
    const dataEventToSend = {
      chatId,
    };
    sendMessageOrEvent(dataEventToSend, URLs.leaveOutGroupChat);
    setFilteredPrivateChats(prevRooms =>
      prevRooms.filter(chat => chat.chat.id !== chatId)
    );
    setChatData(null);
    handleClose();
    closeConfirmation();
  };

  return (
    <>
      <ModalWindowStyled
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <InfoModalStyled>
            <CloseBtn onClick={handleClose}>
              <IoCloseOutline />
            </CloseBtn>
            <UserContactInfoStyled>
              {userAvatarUrl ? (
                <ModalAvatar
                  src={userAvatarUrl || undefined}
                  alt={`${userName}'s avatar`}
                />
              ) : (
                <LetterAvatarStyled>
                  {userName[0].toUpperCase()}
                </LetterAvatarStyled>
              )}

              <UserInfo>
                <h5>{userName}</h5>
                <p title={userEmail}>{userEmail}</p>
              </UserInfo>
            </UserContactInfoStyled>
            <hr />
            <AboutUser>
              <InfoIcon />
              <p>
                {about ||
                  `${userName} hasn't added a description yet. But soon this space will be filled with interesting facts and stories.`}
              </p>
            </AboutUser>
            <hr />

            {isPrivateChat ? (
              <ButtonLeave onClick={openConfirmation}>Leave Chat</ButtonLeave>
            ) : (
              <ButtonBlock>
                <SignUpBtn onClick={() => handleCreatePrivateChat(id)}>
                  Message
                </SignUpBtn>
              </ButtonBlock>
            )}
          </InfoModalStyled>
        </Fade>
      </ModalWindowStyled>
      <ModalWindowStyled
        open={confirmOpen}
        onClose={closeConfirmation}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={confirmOpen}>
          <ConfirmModalStyled>
            <h5>Are you sure you want to leave the chat?</h5>
            <ConfirmBlock>
              <button
                type="button"
                className="confirm"
                onClick={handleLeaveGroup}
              >
                Yes, leave
              </button>
              <button
                type="button"
                className="cancel"
                onClick={closeConfirmation}
              >
                Cancel
              </button>
            </ConfirmBlock>
          </ConfirmModalStyled>
        </Fade>
      </ModalWindowStyled>
    </>
  );
};

UserInfoModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  userAvatarUrl: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  about: PropTypes.string,
};

export default UserInfoModal;
