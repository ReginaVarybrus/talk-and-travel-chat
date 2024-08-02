/* eslint-disable react/forbid-prop-types */
import { useFetch } from '@/hooks/useFetch.js';
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
  const { responseData } = useFetch(ULRs.userAvatart(userId), {
    responseType: 'arraybuffer',
  });
  const time = timeStampConverter(date);

  return (
    <MessageItemStyled>
      {responseData && userId && <UserAvatar responseData={responseData} />}
      <MessageContent>
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
