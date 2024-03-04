import DMsSearchBar from '@/components/DMsSearchBar/DMsSearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from '../RoomsChatRoute/ChatRouteStyled.js';

const DmsChatRoute = () => (
  <ChatRouteStyled>
    <DMsSearchBar />
    <Chat />
  </ChatRouteStyled>
);

export default DmsChatRoute;
