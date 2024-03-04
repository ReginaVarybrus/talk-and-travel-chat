import { useSelector } from 'react-redux';
import {
  getCountryName,
  getNumberOfParticipants,
} from '@/redux-store/AuthOperations/selectors.js';
import { ChatStyled, Header, HeaderContent, MessageBlock } from './ChatStyled';
import MessageBar from '../MessageBar/MessageBar';

const Chat = () => {
  const countryName = useSelector(getCountryName);
  const participants = useSelector(getNumberOfParticipants);

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          <h5>{countryName || 'Country Name'}</h5>
          <p>{participants || 0} members</p>
        </HeaderContent>
      </Header>
      <MessageBlock />
      <MessageBar />
    </ChatStyled>
  );
};

export default Chat;
