import logo from '@/images/logo.svg';
import { ChatStyled, LogoBox, Logo } from './ChatFirstLoadingStyled.js';

const ChatFistLoading = () => (
  <ChatStyled>
    <LogoBox>
      <Logo src={logo} alt="logo" />
      <p>Please, select a room from room list to start using our platform</p>
    </LogoBox>
  </ChatStyled>
);

export default ChatFistLoading;
