/* eslint-disable react/forbid-prop-types */
import { useFetch } from '@/hooks/useFetch.js';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import ULRs from '@/redux-store/constants';
import PropTypes from 'prop-types';
import UserAvatar from '../UserAvatar/UserAvatart';
import { timeStampConverter } from '../utils/timeUtil.js';
import {
  MessageItemStyled,
  MessageContent,
  Text,
  Time,
} from './MessageItemStyles.js';

const MessageItem = ({ content, userId, date }) => {
  const currentUserId = useSelector(getUser)?.id;
  const { responseData } = useFetch(ULRs.userAvatart(userId), {
    responseType: 'arraybuffer',
  });
  const time = timeStampConverter(date);

  const isCurrentUser = userId === currentUserId;

  return (
    <MessageItemStyled>
      {responseData && userId && <UserAvatar responseData={responseData} />}
      <MessageContent $backgroundMessage={isCurrentUser}>
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
};

export default MessageItem;
