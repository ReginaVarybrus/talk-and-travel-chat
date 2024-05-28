import { timeStampConverter } from '../utils/timeUtil.js';

export const MessageItem = ({ message, date }) => {
  const time = timeStampConverter(date);

  return (
    <div>
      <div>Avatar</div>
      <div>
        <span>{message.content}</span>
        <span>{time}</span>
      </div>
    </div>
  );
};
