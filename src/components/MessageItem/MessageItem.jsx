import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import URLs from '@/constants/constants';
import { axiosClient } from '@/services/api';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import PropTypes from 'prop-types';
import UserInfoModal from '@/components/UserInfoModal/UserInfoModal';
import { timeStampConverter } from '@/components/utils/timeUtil.js';

import {
  MessageItemStyled,
  MessageContentStyled,
  LetterAvatarStyled,
  ContentMessage,
  ContentJoinOrLeave,
  Time,
  Badge,
} from './MessageItemStyled';

const MessageItem = ({
  content,
  userId,
  userName,
  date,
  type,
  isShownAvatar,
  isOnline,
}) => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const currentUserId = useSelector(getUser)?.id;
  const time = timeStampConverter(date);
  const isCurrentUser = userId === currentUserId;

  if ([MESSAGE_TYPES.START_TYPING, MESSAGE_TYPES.STOP_TYPING].includes(type)) {
    return null;
  }

  const messageTypeText = type === MESSAGE_TYPES.TEXT;
  const messageTypeJoin = type === MESSAGE_TYPES.JOIN;
  const messageTypeLeave = type === MESSAGE_TYPES.LEAVE;

  const handleOpen = async () => {
    if (isCurrentUser) {
      return;
    }
    try {
      const userInfoResponse = await axiosClient.get(URLs.userInfo(userId));
      setUserInfo(userInfoResponse.data);
      const privateChatsResponse = await axiosClient.get(URLs.getPrivateChats);
      setUserChats(privateChatsResponse.data);
      if (userInfoResponse.data.userName) {
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
        <LetterAvatarStyled
          $isCurrentUser={isCurrentUser}
          onClick={!isCurrentUser ? handleOpen : undefined}
        >
          {userName[0].toUpperCase()}
          {isOnline && <Badge />}
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
      {(messageTypeJoin || messageTypeLeave) && (
        <ContentJoinOrLeave>{content || `message`}</ContentJoinOrLeave>
      )}
      <UserInfoModal
        open={open}
        handleClose={handleClose}
        avatar={userInfo?.avatar}
        userName={userInfo?.userName}
        userEmail={userInfo?.userEmail}
        about={userInfo?.about}
        id={userInfo?.id}
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
