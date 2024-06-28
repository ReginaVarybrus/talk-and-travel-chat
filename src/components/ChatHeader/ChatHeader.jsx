import { ChatHeaderStyled, HeaderContent } from './ChatHeaderStyled';

const ChatHeader = ({ countryData }) => (
  <ChatHeaderStyled>
    <HeaderContent>
      <h5>{countryData.name || 'Country Name'}</h5>
      <p>
        {`${
          countryData.participants ? countryData.participants.length : '0'
        } participants`}
      </p>
    </HeaderContent>
  </ChatHeaderStyled>
);

export default ChatHeader;
