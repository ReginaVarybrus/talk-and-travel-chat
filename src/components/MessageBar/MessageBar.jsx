import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import {
  MessageBarStyled,
  MessageInputs,
  ButtonAttachFile,
  VisuallyHiddenInput,
  AttachmentIcon,
  TextareaAutosize,
  ButtonSendMessage,
  SendIcon,
} from './MessageBarStyled';

const MessageBar = ({ countryData, setMessagesList }) => {
  const [message, setMessage] = useState('');

  const userId = useSelector(getUser)?.id;
  const textAreaRef = useRef(null);
  const stompClient = useStompClient();

  const { sendMessage } = useWebSocket();

  const isInputNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  useSubscription(`/countries/${countryData?.id}/messages`, response => {
    const message = JSON.parse(response.body);
    setMessagesList(prevMessages => [...prevMessages, message]);
    console.log('response message', message);
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!stompClient) {
      console.error('Cannot send message: WebSocket not connected');
      return;
    }

    const dataToSend = {
      content: message,
      countryId: countryData?.id,
      senderId: userId,
    };

    sendMessage(dataToSend);

    setMessage('');
  };

  return (
    <MessageBarStyled>
      <MessageInputs onSubmit={handleSubmit}>
        <ButtonAttachFile component="label" variant="contained">
          <AttachmentIcon />
          <VisuallyHiddenInput type="file" />
        </ButtonAttachFile>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Type here"
          value={message}
          onKeyUp={e => e.key === 'Enter' && handleSubmit(e)}
          onChange={handleChange}
          ref={textAreaRef}
          maxLength="1000"
        />
        <ButtonSendMessage
          type="submit"
          value="Send"
          $isInputNotEmpty={isInputNotEmpty}
        >
          <SendIcon />
        </ButtonSendMessage>
      </MessageInputs>
    </MessageBarStyled>
  );
};

export default MessageBar;
