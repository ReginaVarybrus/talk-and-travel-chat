import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { axiosClient } from '@/services/api';
// eslint-disable-next-line import/no-extraneous-dependencies
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

const MessageBar = ({
  countryData,
  setCountryData,
  setSubscriptionCountryRooms,
}) => {
  const [message, setMessage] = useState('');
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(true);
  const userId = useSelector(getUser)?.id;
  const textAreaRef = useRef(null);
  const stompClient = useStompClient();
  const { sendMessage } = useWebSocket();

  const isInputNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  useEffect(() => {
    console.log('useEffect triggered');
    console.log('countryData:', countryData);

    if (countryData?.isSubscribed) {
      setIsShowJoinBtn(false);
    } else {
      setIsShowJoinBtn(true);
    }
  }, [countryData?.isSubscribed]);

  useSubscription(
    `/countries/${countryData?.country?.name}/messages`,
    response => {
      const receivedMessage = JSON.parse(response.body);

      setCountryData(prevCountryData => {
        const updatedGroupMessages = [
          ...(prevCountryData.country.groupMessages || []),
          receivedMessage,
        ];
        return {
          ...prevCountryData,
          country: {
            ...prevCountryData.country,
            groupMessages: updatedGroupMessages,
          },
        };
      });
      console.log('response message', receivedMessage);
    }
  );

  const handleSubmit = e => {
    e.preventDefault();

    if (!stompClient) {
      console.error('Cannot send message: WebSocket not connected');
      return;
    }

    const dataToSend = {
      content: message,
      countryId: countryData?.country.id,
      senderId: userId,
    };

    sendMessage(dataToSend);

    setMessage('');
  };

  const handleJoinClick = async () => {
    console.log('Joined to current country');
    const fetchData = async id => {
      try {
        const response = await axiosClient.post(
          `/countries/${countryData?.country.name}/join`,
          id
        );

        console.log('Join data:', response);

        if (response.status === 200) {
          setIsShowJoinBtn(false);
        }

        setSubscriptionCountryRooms(prevRooms => [
          ...prevRooms,
          countryData?.country,
        ]);
      } catch (error) {
        console.error('Error fetching country rooms:', error);
      }
    };

    fetchData(userId);
  };

  return (
    <MessageBarStyled>
      {isShowJoinBtn ? (
        <ButtonSendMessage onClick={handleJoinClick}>Join</ButtonSendMessage>
      ) : (
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
      )}
    </MessageBarStyled>
  );
};

export default MessageBar;
