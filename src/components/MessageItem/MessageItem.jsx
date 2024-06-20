/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { timeStampConverter } from '../utils/timeUtil.js';

const MessageItem = ({ message }) => {
  const time = timeStampConverter(message.creationDate);

  return (
    <div>
      <div>avatar</div>
      <div>
        <span>{message.content || `message`}</span>
        <span>{time || 'time'}</span>
      </div>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object,
};

export default MessageItem;
