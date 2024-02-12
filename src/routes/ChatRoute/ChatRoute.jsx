import React from 'react';
import { Container } from './ChatRouteStyled.js';

import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';

const ChatRoute = () => {
  return (
    <Container>
      <SearchBar />
      <Chat />
    </Container>
  );
};

export default ChatRoute;
