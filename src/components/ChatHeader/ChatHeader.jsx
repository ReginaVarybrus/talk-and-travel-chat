import PropTypes from 'prop-types';
import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  countryName,
  participantsAmount,
  isUserTyping,
  userNameisTyping,
}) => (
  <ChatHeaderStyled>
    <h5>{countryName || 'Country Name'}</h5>
    {isUserTyping ? (
      <p>{`${userNameisTyping} is typing...`}</p>
    ) : (
      <p>{`${participantsAmount || '0'} participants`}</p>
    )}
  </ChatHeaderStyled>
);

ChatHeader.propTypes = {
  countryName: PropTypes.string,
  participantsAmount: PropTypes.number,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
};

export default ChatHeader;
