import { timeStampConverter } from '../utils/timeUtil.js';

export const MessageItem = ({ avatar, message, date }) => {
  const time = timeStampConverter(date);

  return (
    <div>
      <div>{avatar || 'avatar'}</div>
      <div>
        <span>{message.content || `message`}</span>
        <span>{time || 'time'}</span>
      </div>
    </div>
  );
};
