/* eslint-disable react/forbid-prop-types */
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import PropTypes from 'prop-types';
import { timeStampConverter } from '../utils/timeUtil.js';
import {
  MessageItemStyled,
  MessageContent,
  Avatar,
  ContentMessage,
  ContentJoin,
  Time,
} from './MessageItemStyles.js';

const MessageItem = ({
  content,
  userId,
  userName,
  date,
  type,
  isShownAvatar,
}) => {
  const currentUserId = useSelector(getUser)?.id;
  const time = timeStampConverter(date);
  const firstLetterOfName = userName.substr(0, 1).toUpperCase();
  const isCurrentUser = userId === currentUserId;

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
