/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import ULRs from '@/redux-store/constants';
import { axiosClient } from '@/services/api';
import PropTypes from 'prop-types';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import UserAvatar from '../UserAvatar/UserAvatar';
import { timeStampConverter } from '../utils/timeUtil.js';

import {
  MessageItemStyled,
  MessageContent,
  Avatar,
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

  const handleOpen = async () => {
    setOpen(true);

    try {
      const response = await axiosClient.get(ULRs.userInfo(userId));
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <MessageItemStyled $isShownAvatar={isShownAvatar}>
      {type === 'TEXT' && userId && isShownAvatar && (
        <Avatar>{firstLetterOfName}</Avatar>
      )}
      {type === 'TEXT' && (
        <MessageContent
          $backgroundMessage={isCurrentUser}
          $isShownAvatar={isShownAvatar}
        >
          <ContentMessage>{content || `message`}</ContentMessage>
          <Time>{time || 'time'}</Time>
        </MessageContent>

      <UserInfoModal
        open={open}
        handleClose={handleClose}
        currentUserId={currentUserId}
        userId={userId}
        avatar={userInfo?.avatar}
        userName={userInfo?.userName}
        userEmail={userInfo?.userEmail}
        about={userInfo?.about}
      />
      )}
      {type === 'JOIN' && <ContentJoin>{content || `message`}</ContentJoin>}
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
