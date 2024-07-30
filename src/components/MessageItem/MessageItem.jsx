/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { timeStampConverter } from '../utils/timeUtil.js';
import {
  MessageItemStyled,
  MessageContent,
  Name,
  Text,
  Time,
} from './MessageItemStyles.js';

const MessageItem = ({ message }) => {
  const time = timeStampConverter(message.creationDate);

  return (
    <MessageItemStyled>
      <Name>{message?.user?.userName || `user name`}</Name>
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
