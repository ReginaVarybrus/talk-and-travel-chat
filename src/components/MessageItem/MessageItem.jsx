import { timeStampConverter } from '../utils/timeUtil.js';

export const MessageItem = ({ message, username }) => {
  const time = timeStampConverter(message.createdDateTime);

  return (
    <div>
      <div>avatar</div>
      <div>
        <span>{username}</span>
        <span>{message.content}</span>
        <span>{time}</span>
      </div>
    </div>
  );
};
