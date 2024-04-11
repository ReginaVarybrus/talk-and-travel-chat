import { ChatStyled, LogoBox, Logo } from './ChatFirstLoadingStyled.js';
import logo from '../../../public/logo.svg';

const ChatFistLoading = () => (
  <ChatStyled>
    <LogoBox>
      <Logo src={logo} alt="logo" />
      <p>Please, select a room from room list to start using our platform</p>
    </LogoBox>
  </ChatStyled>
);

export default ChatFistLoading;
