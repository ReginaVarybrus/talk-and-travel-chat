import RoomsSearchBar from '@/components/RoomsSearchBar/RoomsSearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const RoomsChatRoute = () => (
  <ChatRouteStyled>
    <RoomsSearchBar />
    <Chat />
  </ChatRouteStyled>
);

export default RoomsChatRoute;
