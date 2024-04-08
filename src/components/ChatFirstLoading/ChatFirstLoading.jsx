import { ChatStyled, LogoBox, Logo } from './ChatFirstLoadingStyled.js';

const ChatFistLoading = () => (
  <ChatStyled>
    <LogoBox>
      <Logo src="../../../public/logo.svg" alt="logo" />
      <p>Please, select a room from room list to start using our platform</p>
    </LogoBox>
  </ChatStyled>
);

export default ChatFistLoading;
