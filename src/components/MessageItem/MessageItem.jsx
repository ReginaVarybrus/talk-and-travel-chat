/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch.js';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import ULRs from '@/redux-store/constants';
import { axiosClient } from '@/services/api';
import PropTypes from 'prop-types';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import UserAvatar from '../UserAvatar/UserAvatart';
import { timeStampConverter } from '../utils/timeUtil.js';

import {
  MessageItemStyled,
  MessageContent,
  Text,
  Time,
} from './MessageItemStyled';

const MessageItem = ({ content, userId, date, isShownAvatar }) => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const currentUserId = useSelector(getUser)?.id;
  const { responseData } = useFetch(ULRs.userAvatart(userId), {
    responseType: 'arraybuffer',
  });
  const time = timeStampConverter(date);

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
      {responseData && userId && isShownAvatar && (
        <UserAvatar handleOpen={handleOpen} responseData={responseData} />
      )}
      <MessageContent
        $backgroundMessage={isCurrentUser}
        $isShownAvatar={isShownAvatar}
      >
        <Text>{content || `message`}</Text>
        <Time>{time || 'time'}</Time>
      </MessageContent>

      <UserInfoModal
        open={open}
        handleClose={handleClose}
        currentUserId={currentUserId}
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
  date: PropTypes.string,
  isShownAvatar: PropTypes.bool,
};

export default MessageItem;
