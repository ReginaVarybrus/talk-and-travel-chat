import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { SignUpBtn } from '@/components/RegisterForm/RegisterForm.styled';
import PropTypes from 'prop-types';
import ULRs from '@/constants/constants';
import { axiosClient } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { routesPath } from '@/routes/routesConfig';
import { useChatContext } from '@/providers/ChatProvider';

import {
  ModalWindowStyled,
  InfoModalStyled,
  ButtonClose,
  CloseIcon,
  UserContactInfoStyled,
  ModalAvatar,
  LetterAvatarStyled,
  UserInfo,
  AboutUser,
  InfoIcon,
  ButtonBlock,
} from './UserInfoModalStyled';

const UserInfoModal = ({
  open,
  handleClose,
  avatar,
  userName = 'User name',
  userEmail = 'email@gmail.com',
  about,
  id,
}) => {
  const navigate = useNavigate();
  const { dataUserChats, updateUserChats } = useChatContext();

  const firstLetterOfName = userName.substr(0, 1).toUpperCase();

  const checkExistingPrivateChat = companionId => {
    const isExist = dataUserChats?.find(
      chat => chat.companion.id === companionId
    );
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
        const response = await axiosClient.post(ULRs.createPrivateChat, {
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

  return (
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
          <ButtonClose onClick={handleClose}>
            <CloseIcon />
          </ButtonClose>
          <UserContactInfoStyled>
            {avatar ? (
              <ModalAvatar />
            ) : (
              <LetterAvatarStyled>{firstLetterOfName}</LetterAvatarStyled>
            )}

            <UserInfo>
              <h5>{userName}</h5>
              <p>{userEmail}</p>
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
          <ButtonBlock>
            <SignUpBtn onClick={() => handleCreatePrivateChat(id)}>
              Message
            </SignUpBtn>
          </ButtonBlock>
        </InfoModalStyled>
      </Fade>
    </ModalWindowStyled>
  );
};

UserInfoModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  about: PropTypes.string,
};

export default UserInfoModal;
