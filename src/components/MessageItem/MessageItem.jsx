/* eslint-disable react/forbid-prop-types */
import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch.js';
import ULRs from '@/redux-store/constants';
import PropTypes from 'prop-types';
import { timeStampConverter } from '../utils/timeUtil.js';
import {
  MessageItemStyled,
  MessageContent,
  Avatar,
  Text,
  Time,
} from './MessageItemStyles.js';

const MessageItem = ({ message }) => {
  const [avatarSrc, setAvatarSrc] = useState('');
  const userId = message?.user.id;
  const { responseData } = useFetch(ULRs.userAvatart(userId), {
    responseType: 'arraybuffer',
  });
  const time = timeStampConverter(message.creationDate);

  useEffect(() => {
    if (responseData && userId) {
      const base64String = btoa(
        new Uint8Array(responseData).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      setAvatarSrc(`data:image/png;base64,${base64String}`);
    }
  }, [responseData, userId]);

  return (
    <MessageItemStyled>
      <Avatar src={avatarSrc} alt="avatar" />
      <MessageContent>
        <Text>{message?.content || `message`}</Text>
        <Time>{time || 'time'}</Time>
      </MessageContent>
    </MessageItemStyled>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object,
};

export default MessageItem;
