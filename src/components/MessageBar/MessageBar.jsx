import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
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

const MessageBar = ({ countryData, currentCountryRoom }) => {
  const [message, setMessage] = useState('');
  const userId = useSelector(getUser)?.id;
  const textAreaRef = useRef(null);

  const { sendMessage, isConnected } = useWebSocket();

  const isInputNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();

    if (!isConnected) {
      console.error('Cannot send message: WebSocket not connected');
      return;
    }

    const dataToSend = {
      content: message,
      countryId: countryData?.id,
      senderId: userId,
    };

    sendMessage(currentCountryRoom, dataToSend);

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
