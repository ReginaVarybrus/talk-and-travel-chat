import { useSelector } from 'react-redux';
import { getCountryName } from '@/redux-store/selectors.js';
import { ChatStyled, Header, HeaderContent, MessageBlock } from './ChatStyled';

import MessageBar from '../MessageBar/MessageBar';

const Chat = () => {
  const countryName = useSelector(getCountryName);

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          <h5>{countryName || 'Country Name'}</h5>
        </HeaderContent>
      </Header>
      <MessageBlock />
      <MessageBar />
    </ChatStyled>
  );
};

export default Chat;
