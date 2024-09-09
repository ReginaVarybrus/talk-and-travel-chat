import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { SignUpBtn } from '@/components/RegisterForm/RegisterForm.styled';
import PropTypes from 'prop-types';
import {
  ModalWindowStyled,
  InfoModalStyled,
  ButtonClose,
  CloseIcon,
  UserContactInfo,
  ModalAvatar,
  LetterAvatarStyled,
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
}) => {
  const firstLetterOfName = userName.substr(0, 1).toUpperCase();

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
              <LetterAvatarStyled>{firstLetterOfName}</LetterAvatarStyled>
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
  avatar: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  about: PropTypes.string,
};

export default UserInfoModal;
