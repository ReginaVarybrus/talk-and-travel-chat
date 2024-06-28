import { useState, useRef, useEffect } from 'react';
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

const MessageBar = ({ countryData, setCountryData }) => {
  const [message, setMessage] = useState('');
  const userId = useSelector(getUser)?.id;
  const textAreaRef = useRef(null);

  const { subscribeToCountryRoom, sendMessage, isConnected } = useWebSocket();

  const isInputNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  useEffect(() => {
    const onDataReceived = data => {
      console.log('Received new MESSAGE data:', data);
      setCountryData(data.body);
    };

    if (isConnected) {
      console.log(
        'Connected to WebSocket. Subscribing to country room:',
        countryData?.name
      );
      subscribeToCountryRoom(countryData?.name, onDataReceived);
    } else {
      console.log('WebSocket not connected yet.');
    }
  }, [countryData.groupMessages]);

  const handleSubmit = e => {
    e.preventDefault();

    const dataToSend = {
      content: message,
      creationDate: new Date(),
      countryId: countryData?.id,
      senderId: userId,
    };

    sendMessage(countryData?.name, dataToSend);

    setCountryData(prevData => ({
      ...prevData,
      groupMessages: [...(prevData.groupMessages || []), dataToSend],
    }));

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
