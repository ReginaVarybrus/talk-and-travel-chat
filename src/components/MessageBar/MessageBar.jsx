import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ULRs from '@/constants/constants';
import { CHAT_TYPES } from '@/constants/chatTypes';
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
  chatId,
  chatData,
  setSubscriptionRooms,
  isShowJoinBtn,
  setIsShowJoinBtn,
  isUserTyping,
  setIsUserTyping,
  setParticipantsAmount,
  scrollToBottom,
}) => {
  const [message, setMessage] = useState('');
  const typingStopTimeoutRef = useRef(null);

  const { stompClient, sendMessage, sendEvent } = useWebSocket();
  const isMessageNotEmpty = Boolean(message?.trim().length);
  const isGroupChat = chatData?.chatType === CHAT_TYPES.GROUP;

  const dataEventToSend = {
    chatId,
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

    if (typingStopTimeoutRef.current) {
      clearTimeout(typingStopTimeoutRef.current);
    }

    typingStopTimeoutRef.current = setTimeout(() => {
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
      chatId,
    };

    sendMessage(dataMessageToSend);
    setMessage('');
    handleStopTyping();
    clearTimeout(typingStopTimeoutRef.current);
    scrollToBottom();
  };

  const handleJoinClick = () => {
    sendEvent(dataEventToSend, ULRs.joinToGroupChat);
    setIsShowJoinBtn(false);
    setSubscriptionRooms(prevRooms => [...prevRooms, chatData.country]);
    setParticipantsAmount(prevCount => prevCount + 1);
  };

  return (
    <MessageBarStyled>
      {isShowJoinBtn && isGroupChat ? (
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
  chatId: PropTypes.number,
  chatData: PropTypes.shape({
    chatType: PropTypes.oneOf(['GROUP', 'PRIVATE']),
    country: PropTypes.shape({
      flagCode: PropTypes.string,
      name: PropTypes.string,
    }),
    creationDate: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    messages: PropTypes.array,
    name: PropTypes.string,
    usersCount: PropTypes.number,
  }),
  setSubscriptionRooms: PropTypes.func,
  isShowJoinBtn: PropTypes.bool,
  setIsShowJoinBtn: PropTypes.func,
  isUserTyping: PropTypes.bool,
  setIsUserTyping: PropTypes.func,
  setParticipantsAmount: PropTypes.func,
};

export default MessageBar;
