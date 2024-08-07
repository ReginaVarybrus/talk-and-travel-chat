import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({ countryName, participantsAmount }) => (
  <ChatHeaderStyled>
    <h5>{countryName || 'Country Name'}</h5>
    <p>{`${participantsAmount || '0'} participants`}</p>
  </ChatHeaderStyled>
);

export default ChatHeader;
