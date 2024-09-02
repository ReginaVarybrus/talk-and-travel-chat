import { createContext, useContext } from 'react';

const ChatTypeContext = createContext();

export const useChatType = () => useContext(ChatTypeContext);

export const ChatTypeProvider = ({ chatType, children }) => (
  <ChatTypeContext.Provider value={chatType}>
    {children}
  </ChatTypeContext.Provider>
);
