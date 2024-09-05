import { ChatHeaderStyled } from './ChatHeaderStyled';

const ChatHeader = ({
  chatName,
  participantsAmount,
  selectedCompanion,
  isPrivateChat,
}) => (
  <ChatHeaderStyled>
    {isPrivateChat ? (
      <h5>{selectedCompanion.userName}</h5>
    ) : (
      <h5>{chatName || 'Country Name'}</h5>
    )}

    {!isPrivateChat && <p>{`${participantsAmount || '0'} participants`}</p>}
  </ChatHeaderStyled>
);

export default ChatHeader;

// add online status for dms chat
