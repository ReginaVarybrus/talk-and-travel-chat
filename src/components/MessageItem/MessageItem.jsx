import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import avatarImage from '@/images/img/Avatar.png';
import { SignUpBtn } from '@/components/RegisterForm/RegisterForm.styled';
import {
  MessageItemStyled,
  MessageContent,
  Text,
  Time,
  UserInfoModal,
  ButtonClose,
  UserContactInfo,
  ModalAvatar,
  AboutUser,
  InfoIcon,
  ButtonBlock,
} from './MessageItemStyled';

import { Avatar } from '../DMsList/DMsListStyled.js';

export const MessageItem = ({ message }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MessageItemStyled>
      <Avatar onClick={handleOpen}>
        <img src={avatarImage} alt="avatar" />
      </Avatar>
      <MessageContent>
        <Text>{message || 'Hi there! How are you? '}</Text>
        <Time>9.10</Time>
      </MessageContent>

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
          <UserInfoModal>
            <ButtonClose onClick={handleClose} />
            <UserContactInfo>
              <ModalAvatar src={avatarImage} alt="avatar" />
              <div>
                <h5>Contact info</h5>
                <p>email@gmail.com</p>
              </div>
            </UserContactInfo>
            <hr />
            <AboutUser>
              <InfoIcon />
              <p>
                I have dog that travel with me all the time. I like It so much.
                Also I love cold countries, so I usually travel to Norway or
                Denmark
              </p>
            </AboutUser>
            <hr />
            <ButtonBlock>
              <SignUpBtn onClick={() => {}}>Message</SignUpBtn>
            </ButtonBlock>
          </UserInfoModal>
        </Fade>
      </Modal>
    </MessageItemStyled>
  );
};
