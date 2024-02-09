import React from 'react';
import { Container, ChatWrapper } from './ChatPageStyled.js';

import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';

export default function ChatPage() {
  return (
    <Container>
      <SearchBar />
      <ChatWrapper>
        <Chat />
      </ChatWrapper>
    </Container>
  );
}
