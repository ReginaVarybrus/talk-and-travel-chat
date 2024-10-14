import logo from '@/images/logo.svg';
import { ChatFistLoadingStyled, Logo, Text } from './ChatFirstLoadingStyled.js';

const ChatFistLoading = () => (
  <ChatFistLoadingStyled>
    <Logo src={logo} alt="logo" width="240" height="200" />
    <Text>
      Please, select a room from room list to start using our platform
    </Text>
  </ChatFistLoadingStyled>
);

export default ChatFistLoading;
