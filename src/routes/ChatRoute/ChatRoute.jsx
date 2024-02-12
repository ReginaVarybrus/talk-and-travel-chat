import React from 'react';
import { Container, ChatStyled } from './ChatRouteStyled.js';

import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';

export default function ChatPage() {
  return (
    <Container>
      <SearchBar />
      <ChatStyled>
        <Chat />
      </ChatStyled>
    </Container>
  );
}
