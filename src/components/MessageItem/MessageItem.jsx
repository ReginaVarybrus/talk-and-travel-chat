/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { timeStampConverter } from '../utils/timeUtil.js';

const MessageItem = ({ message }) => {
  const userId = useSelector(getUser)?.id;
  const time = timeStampConverter(message.creationDate);

  return (
    <div>
      <div>{userId || `id`}</div>
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
