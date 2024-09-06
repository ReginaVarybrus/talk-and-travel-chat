import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
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
  isUserTyping,
  setIsUserTyping,
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

  const handleStartTyping = () => {
    if (!isUserTyping) {
      setIsUserTyping(true);
      sendEvent(dataEventToSend, ULRs.startTyping);
    }
  };

  const handleStopTyping = () => {
    setIsUserTyping(false);
    sendEvent(dataEventToSend, ULRs.stopTyping);
  };

  const handleChange = ({ target: { value } }) => {
    setMessage(value);

    handleStartTyping();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
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
    handleStopTyping();
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
  country: PropTypes.shape({
    chatType: PropTypes.oneOf(['GROUP', 'PRIVATE']),
    country: PropTypes.shape({
      flagCode: PropTypes.string,
      name: PropTypes.string,
    }),
    creationDate: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        chatId: PropTypes.number,
        content: PropTypes.string,
        creationDate: PropTypes.string,
        id: PropTypes.number,
        repliedMessageId: PropTypes.number,
        type: PropTypes.oneOf([
          'TEXT',
          'JOIN',
          'LEAVE',
          'START_TYPING',
          'STOP_TYPING',
        ]),
        user: PropTypes.shape({
          id: PropTypes.number,
          userName: PropTypes.string,
        }),
      })
    ),
    name: PropTypes.string,
    usersCount: PropTypes.number,
  }),
  setSubscriptionCountryRooms: PropTypes.func,
  isShowJoinBtn: PropTypes.bool,
  setIsShowJoinBtn: PropTypes.func,
  isUserTyping: PropTypes.bool,
  setIsUserTyping: PropTypes.func,
};

export default MessageBar;
