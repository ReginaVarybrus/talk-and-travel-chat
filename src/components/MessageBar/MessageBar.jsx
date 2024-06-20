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

const MessageBar = ({ countryData }) => {
  const [message, setMessage] = useState('');
  const userId = useSelector(getUser)?.id;
  const userName = useSelector(getUser)?.userName;
  const userEmail = useSelector(getUser)?.userEmail;
  const textAreaRef = useRef(null);

  const { sendMessage } = useWebSocket();

  const isInputNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();

    const dataToSend = {
      content: message,
      creationDate: new Date(),
      countryId: countryData?.id,
      user: {
        about: null,
        avatar: null,
        senderId: userId,
        role: 'USER',
        userEmail,
        userName,
      },
    };

    // setCountryData(prevData => ({
    //   ...prevData,
    //   groupMessages: [...(prevData.groupMessages || []), dataToSend],
    // }));

    sendMessage(countryData?.name, dataToSend);

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
