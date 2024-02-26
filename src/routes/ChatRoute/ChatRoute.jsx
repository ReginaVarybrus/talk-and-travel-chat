import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => (
  <ChatRouteStyled>
    <SearchBar />
    <Chat />
  </ChatRouteStyled>
);

export default ChatRoute;
