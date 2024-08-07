import logo from '@/images/logo.svg';
import { ChatFistLoadingStyled, Logo } from './ChatFirstLoadingStyled.js';

const ChatFistLoading = () => (
  <ChatFistLoadingStyled>
    <Logo src={logo} alt="logo" width="240" height="200" />
    <p>Please, select a room from room list to start using our platform</p>
  </ChatFistLoadingStyled>
);

export default ChatFistLoading;
