import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import { axiosClient } from '@/services/api';
import ULRs from '@/redux-store/constants';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSubscription } from 'react-stomp-hooks';
import {
  MessageBarStyled,
  ButtonJoinWrapper,
  MessageInputs,
  ButtonAttachFile,
  VisuallyHiddenInput,
  AttachmentIcon,
  TextareaAutosize,
  ButtonSendMessage,
  SendIcon,
} from './MessageBarStyled';

const MessageBar = ({
  countryName,
  country,
  isSubscribed,
  setCountryData,
  setSubscriptionCountryRooms,
}) => {
  const [message, setMessage] = useState('');
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(!isSubscribed);
  const userId = useSelector(getUser)?.id;
  const { stompClient, subscribeToGroupMessages, sendMessage } = useWebSocket();

  const isMessageNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  useEffect(() => {
    if (isSubscribed) {
      setIsShowJoinBtn(false);
    } else {
      setIsShowJoinBtn(true);
    }
  }, [isSubscribed]);

  useSubscription(ULRs.subscriptionToGroupMessages(countryName), response => {
    subscribeToGroupMessages(response, setCountryData);
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!stompClient) {
      console.error('Cannot send message: WebSocket not connected');
      return;
    }

    const dataToSend = {
      content: message,
      countryId: country?.id,
      senderId: userId,
    };

    sendMessage(dataToSend);

    setMessage('');
  };

  const handleJoinClick = async () => {
    try {
      const response = await axiosClient.post(
        ULRs.joinToCountryRoom(countryName),
        userId
      );

      console.log('Join data:', response);

      if (response.status === 200) {
        setIsShowJoinBtn(false);
      }

      isSubscribed = true;

      setSubscriptionCountryRooms(prevRooms => [...prevRooms, country]);
    } catch (error) {
      console.error('Error fetching country rooms:', error);
    }
  };

  return (
    <MessageBarStyled>
      {isShowJoinBtn ? (
        <ButtonJoinWrapper>
          <BasicButton
            variant="contained"
            color="primary"
            sx={{
              marginTop: '32px',
            }}
            text="Join to the country chat"
            handleClick={handleJoinClick}
          />
        </ButtonJoinWrapper>
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
            maxLength="1000"
          />
          <ButtonSendMessage
            type="submit"
            value="Send"
            $isMessageNotEmpty={isMessageNotEmpty}
          >
            <SendIcon />
          </ButtonSendMessage>
        </MessageInputs>
      )}
    </MessageBarStyled>
  );
};

export default MessageBar;
