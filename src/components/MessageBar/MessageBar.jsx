import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { axiosClient } from '@/services/api';
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

const MessageBar = ({ countryData, setCountryData }) => {
  const [message, setMessage] = useState('');

  const userId = useSelector(getUser)?.id;
  const textAreaRef = useRef(null);
  const stompClient = useStompClient();

  const { sendMessage } = useWebSocket();

  const isInputNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  useSubscription(`/countries/${countryData?.name}/messages`, response => {
    const message = JSON.parse(response.body);

    setCountryData(prevCountryData => {
      const updatedGroupMessages = [
        ...(prevCountryData.groupMessages || []),
        message,
      ];
      return {
        ...prevCountryData,
        groupMessages: updatedGroupMessages,
      };
    });
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

  const handleJoinClick = () => {
    console.log('Joined to current country');
    const fetchData = async () => {
      try {
        console.log('send fetch request');
        const response = await axiosClient.post(
          `/countries/${countryData?.country.countryName}/join`
        );
        // setResponseData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching country rooms:', error);
      }
    };

    fetchData();
  };

  return (
    <MessageBarStyled>
      {countryData.isSubscribe ? (
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
      ) : (
        <ButtonSendMessage onClick={handleJoinClick}>Join</ButtonSendMessage>
      )}
    </MessageBarStyled>
  );
};

export default MessageBar;
