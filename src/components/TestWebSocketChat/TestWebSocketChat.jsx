/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';

import {
  ChatStyled,
  Header,
  HeaderContent,
  MessageBlock,
  MessageBarWrapper,
  ButtonAttachFile,
  VisuallyHiddenInput,
} from '../Chat/ChatStyled.js';
import {
  MessageBar,
  TextareaAutosize,
  ButtonSendMessage,
} from './TestWebSocketChatStyled.js';
import Icons from '../Icons/Icons';
import { MessageList } from '../MessageList/MessageList';

const Chat = () => {
  // const [params, setParams] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const userName = useSelector(getUser)?.name;

  const { sendMessage, connectedCountryRoom } = useWebSocket();

  const isInputNotEmpty = Boolean(message?.trim().length);

  // useEffect(() => {
  //   connectToCountryRoom('countryName', params, handleData);
  // }, []);

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(message);
    setMessageList(prevMessageList => [...prevMessageList, message]);
    setMessage('');

    console.log('Message:', message);
  };

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          <h5>{connectedCountryRoom || 'Country Name'}</h5>
        </HeaderContent>
      </Header>

      <MessageBlock>
        <MessageList messages={messageList} username={userName} />
      </MessageBlock>

      <MessageBarWrapper>
        <MessageBar onSubmit={handleSubmit}>
          <ButtonAttachFile component="label" variant="contained">
            <Icons name="attach-file" fill="var(--color-grey-9)" size="24" />
            <VisuallyHiddenInput type="file" />
          </ButtonAttachFile>
          <TextareaAutosize
            type="text"
            name="message"
            placeholder="Type here (test)"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <ButtonSendMessage
            type="submit"
            onSubmit={handleSubmit}
            value="Send"
            $isInputNotEmpty={isInputNotEmpty}
          />
        </MessageBar>
      </MessageBarWrapper>
    </ChatStyled>
  );
};

export default Chat;
