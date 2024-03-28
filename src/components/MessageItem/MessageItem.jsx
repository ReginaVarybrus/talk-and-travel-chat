// import { useSelector } from 'react-redux';
// import { getUserName } from '@/redux-store/AuthOperations/selectors.js';
import { timeStampConverter } from '../utils/timeUtil.js';

export const MessageItem = ({ message, username }) => {
  //   const userName = useSelector(getUserName);
  const type = message.messageType.toLowerCase();
  const self = message.username === username ? '_self' : '';
  const time = timeStampConverter(message.createdDateTime);

  return (
    <div>
      <div>avatar</div>
      <div>
        {type !== 'server' && self === '' && <span>{message.username}</span>}
        {/* <span>{userName}</span> */}
        <span>{message.content}</span>
        <span>{time}</span>
      </div>
    </div>
  );
};
