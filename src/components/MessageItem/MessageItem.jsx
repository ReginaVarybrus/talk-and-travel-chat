// // import { useSelector } from 'react-redux';
// import { getUserName } from '@/redux-store/AuthOperations/selectors.js';
import { timeStampConverter } from '../utils/timeUtil.js';

export const MessageItem = ({ message }) => (
  // const time = timeStampConverter(message.createdDateTime);

  <div>
    <div>Avatar</div>
    <div>
      <span>{message}</span>
      <span>9.10</span>
    </div>
  </div>
);
