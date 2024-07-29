import { ChatHeaderStyled, HeaderContent } from './ChatHeaderStyled';

const ChatHeader = ({ countryData }) => (
  <ChatHeaderStyled>
    <HeaderContent>
      <h5>{countryData?.country?.name || 'Country Name'}</h5>
      <p>{`${countryData?.country?.participantsAmount || '0'} participants`}</p>
    </HeaderContent>
  </ChatHeaderStyled>
);

export default ChatHeader;
