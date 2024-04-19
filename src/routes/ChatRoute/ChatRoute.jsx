import SearchBar from '@/components/SearchBar/SearchBar';
// import Chat from '@/components/Chat/Chat';
import TestWebSocketChat from '@/components/TestWebSocketChat/TestWebSocketChat';

import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => (
  <ChatRouteStyled>
    <SearchBar />
    <TestWebSocketChat />
    {/* <Chat /> */}
  </ChatRouteStyled>
);

export default ChatRoute;
