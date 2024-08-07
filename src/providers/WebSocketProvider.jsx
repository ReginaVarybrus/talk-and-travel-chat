// eslint-disable-next-line import/no-extraneous-dependencies
import { StompSessionProvider } from 'react-stomp-hooks';

const WebSocketProvider = ({ children }) => (
  <StompSessionProvider url={`${import.meta.env.VITE_APP_API_URL}/ws/`}>
    {children}
  </StompSessionProvider>
);

export default WebSocketProvider;
