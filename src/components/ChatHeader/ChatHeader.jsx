import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  countryName,
  participantsAmount,
  isUserTyping,
  userNameisTyping,
}) => {
  const userName = useSelector(getUser)?.userName;

  const showUserIsTyping = isUserTyping && userNameisTyping !== userName;

  return (
    <ChatHeaderStyled>
      <h5>{countryName || 'Country Name'}</h5>
      <p>
        {showUserIsTyping
          ? `${userNameisTyping} is typing...`
          : `${participantsAmount || '0'} participants`}
      </p>
    </ChatHeaderStyled>
  );
};

ChatHeader.propTypes = {
  countryName: PropTypes.string,
  participantsAmount: PropTypes.number,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
};

export default ChatHeader;
