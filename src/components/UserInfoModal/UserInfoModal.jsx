// import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import avatarImage from '@/images/img/Avatar.png';
import { SignUpBtn } from '@/components/RegisterForm/RegisterForm.styled';
import PropTypes from 'prop-types';
import {
  InfoModal,
  ButtonClose,
  UserContactInfo,
  ModalAvatar,
  AboutUser,
  InfoIcon,
  ButtonBlock,
} from './UserInfoModalStyled';

const UserInfoModal = ({
  open,
  handleClose,
  avatar,
  userName,
  userEmail,
  about,
}) => (
  <Modal
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
      <InfoModal>
        <ButtonClose onClick={handleClose} />
        <UserContactInfo>
          <ModalAvatar src={avatar || avatarImage} alt="avatar" />
          <div>
            <h5>{userName || 'User name'}</h5>
            <p>{userEmail || 'email@gmail.com'}</p>
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
      </InfoModal>
    </Fade>
  </Modal>
);

UserInfoModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  about: PropTypes.string,
};

export default UserInfoModal;
