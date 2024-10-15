import { StompSessionProvider } from 'react-stomp-hooks';
import { useSelector } from 'react-redux';
import { getToken } from '@/redux-store/selectors.js';

const WebSocketProvider = ({ children }) => {
  const token = useSelector(getToken);

  if (!token) {
    return children;
  }

  return (
    <StompSessionProvider
      url={`${import.meta.env.VITE_APP_API_WS_URL}/ws/`}
      connectHeaders={{
        Authorization: `Bearer ${token}`,
      }}
      reconnectDelay={5000}
    >
      {children}
    </StompSessionProvider>
  );
};

export default WebSocketProvider;
