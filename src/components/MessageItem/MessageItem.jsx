import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import ULRs from '@/redux-store/constants';
import { axiosClient } from '@/services/api';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import PropTypes from 'prop-types';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import { timeStampConverter } from '../utils/timeUtil.js';

import {
  MessageItemStyled,
  MessageContentStyled,
  LetterAvatarStyled,
  ContentMessage,
  ContentJoin,
  Time,
} from './MessageItemStyled';

const MessageItem = ({
  content,
  userId,
  userName,
  date,
  type,
  isShownAvatar,
}) => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const currentUserId = useSelector(getUser)?.id;
  const time = timeStampConverter(date);
  const firstLetterOfName = userName.substr(0, 1).toUpperCase();
  const isCurrentUser = userId === currentUserId;

  if ([MESSAGE_TYPES.START_TYPING, MESSAGE_TYPES.STOP_TYPING].includes(type)) {
    return null;
  }

  const messageTypeText = type === MESSAGE_TYPES.TEXT;
  const messageTypeJoin = type === MESSAGE_TYPES.JOIN;

  const handleOpen = async () => {
    try {
      const response = await axiosClient.get(ULRs.userInfo(userId));
      setUserInfo(response.data);
      if (response.data.userName) {
        setOpen(true);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <MessageItemStyled $isShownAvatar={isShownAvatar}>
      {messageTypeText && userId && isShownAvatar && (
        <LetterAvatarStyled onClick={handleOpen}>
          {firstLetterOfName}
        </LetterAvatarStyled>
      )}
      {messageTypeText && (
        <MessageContentStyled
          $backgroundMessage={isCurrentUser}
          $isShownAvatar={isShownAvatar}
        >
          <ContentMessage>{content || `message`}</ContentMessage>
          <Time>{time || 'time'}</Time>
        </MessageContentStyled>
      )}
      {messageTypeJoin && <ContentJoin>{content || `message`}</ContentJoin>}
      <UserInfoModal
        open={open}
        handleClose={handleClose}
        avatar={userInfo?.avatar}
        userName={userInfo?.userName}
        userEmail={userInfo?.userEmail}
        about={userInfo?.about}
      />
    </MessageItemStyled>
  );
};

MessageItem.propTypes = {
  content: PropTypes.string,
  userId: PropTypes.number,
  userName: PropTypes.string,
  date: PropTypes.string,
  type: PropTypes.string,
  isShownAvatar: PropTypes.bool,
};

export default MessageItem;
