import { ChatHeaderStyled, HeaderContent } from './ChatHeaderStyled';

const ChatHeader = ({ countryData }) => (
  <ChatHeaderStyled>
    <HeaderContent>
      <h5>{countryData?.country || 'Country Name'}</h5>
      <p>
        {`${countryData?.country ? countryData.country : '0'} participants`}
      </p>
    </HeaderContent>
  </ChatHeaderStyled>
);

export default ChatHeader;
