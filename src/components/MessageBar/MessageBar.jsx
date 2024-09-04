/* eslint-disable react/forbid-prop-types */
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import ULRs from '@/redux-store/constants';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
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
  countryChatId,
  country,
  setSubscriptionCountryRooms,
  isShowJoinBtn,
  setIsShowJoinBtn,
}) => {
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef(null);
  const userId = useSelector(getUser)?.id;
  const { stompClient, sendMessage, sendEvent } = useWebSocket();
  const isMessageNotEmpty = Boolean(message?.trim().length);

  const dataEventToSend = {
    authorId: userId,
    chatId: countryChatId,
  };

  const debouncedISUserTyping = debounce(() => {
    sendEvent(dataEventToSend, ULRs.startTyping);
  }, 300);

  const sendUserIsStopTyping = () => {
    sendEvent(dataEventToSend, ULRs.stopTyping);
  };

  const handleChange = ({ target: { value } }) => {
    setMessage(value);

    debouncedISUserTyping();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      sendUserIsStopTyping();
    }, 1500);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!stompClient) {
      console.error('Cannot send message: WebSocket not connected');
      return;
    }

    const dataMessageToSend = {
      content: message,
      chatId: countryChatId,
      senderId: userId,
    };

    sendMessage(dataMessageToSend);
    setMessage('');
    sendUserIsStopTyping();
    clearTimeout(typingTimeoutRef.current);
  };

  const handleJoinClick = () => {
    sendEvent(dataEventToSend, ULRs.joinToGroupChat);
    setIsShowJoinBtn(false);
    setSubscriptionCountryRooms(prevRooms => [...prevRooms, country.country]);
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
            disabled={!isMessageNotEmpty}
          >
            <SendIcon />
          </ButtonSendMessage>
        </MessageInputs>
      )}
    </MessageBarStyled>
  );
};

MessageBar.propTypes = {
  countryChatId: PropTypes.number,
  country: PropTypes.object,
  setSubscriptionCountryRooms: PropTypes.func,
  isShowJoinBtn: PropTypes.bool,
  setIsShowJoinBtn: PropTypes.bool,
};

export default MessageBar;
