import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({ chatName, participantsAmount }) => (
  <ChatHeaderStyled>
    <h5>{chatName || 'Country Name'}</h5>
    <p>{`${participantsAmount || '0'} participants`}</p>
  </ChatHeaderStyled>
);

export default ChatHeader;
