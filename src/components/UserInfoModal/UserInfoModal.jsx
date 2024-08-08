import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import { SignUpBtn } from '@/components/RegisterForm/RegisterForm.styled';
import PropTypes from 'prop-types';
import UserAvatar from '../UserAvatar/UserAvatar';
import {
  ModalWindowStyled,
  InfoModalStyled,
  ButtonClose,
  CloseIcon,
  UserContactInfo,
  ModalAvatar,
  AboutUser,
  InfoIcon,
  ButtonBlock,
} from './UserInfoModalStyled';

const UserInfoModal = ({
  open,
  handleClose,
  userId,
  avatar,
  userName = 'User name',
  userEmail = 'email@gmail.com',
  about,
}) => {
  const { responseData } = useFetch(ULRs.userAvatart(userId), {
    responseType: 'arraybuffer',
  });

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
          <UserContactInfo>
            {avatar ? (
              <ModalAvatar />
            ) : (
              <UserAvatar
                responseData={responseData}
                size="48px"
                sizeTablet="100px"
              />
            )}

            <div>
              <h5>{userName}</h5>
              <p>{userEmail}</p>
            </div>
          </UserContactInfo>
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
            <SignUpBtn onClick={() => {}}>Message</SignUpBtn>
          </ButtonBlock>
        </InfoModalStyled>
      </Fade>
    </ModalWindowStyled>
  );
};

UserInfoModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  userId: PropTypes.number,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  about: PropTypes.string,
};

export default UserInfoModal;
