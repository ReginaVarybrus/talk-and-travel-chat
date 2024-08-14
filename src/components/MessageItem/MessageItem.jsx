/* eslint-disable react/forbid-prop-types */
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import PropTypes from 'prop-types';
import { timeStampConverter } from '../utils/timeUtil.js';
import {
  MessageItemStyled,
  MessageContent,
  Avatar,
  Text,
  Time,
} from './MessageItemStyles.js';

const MessageItem = ({ content, userId, date, isShownAvatar }) => {
  const currentUserId = useSelector(getUser)?.id;
  const time = timeStampConverter(date);

  const isCurrentUser = userId === currentUserId;

  return (
    <MessageItemStyled $isShownAvatar={isShownAvatar}>
      {userId && isShownAvatar && <Avatar>{userId}</Avatar>}
      <MessageContent
        $backgroundMessage={isCurrentUser}
        $isShownAvatar={isShownAvatar}
      >
        <Text>{content || `message`}</Text>
        <Time>{time || 'time'}</Time>
      </MessageContent>
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
