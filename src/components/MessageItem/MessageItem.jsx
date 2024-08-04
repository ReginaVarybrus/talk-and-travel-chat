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

const MessageItem = ({ content, userId, date, isShownAvatar }) => {
  const currentUserId = useSelector(getUser)?.id;
  const { responseData } = useFetch(ULRs.userAvatart(userId), {
    responseType: 'arraybuffer',
  });
  const time = timeStampConverter(date);

  const isCurrentUser = userId === currentUserId;

  return (
    <MessageItemStyled $isShownAvatar={isShownAvatar}>
      {responseData && userId && isShownAvatar && (
        <UserAvatar responseData={responseData} />
      )}
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
