import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ULRs from '@/redux-store/constants';
import { CHAT_TYPES } from '@/constants/chatTypes';
import { getUser } from '@/redux-store/selectors.js';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
// eslint-disable-next-line import/no-extraneous-dependencies
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
}) => {
  const [message, setMessage] = useState('');
  const userId = useSelector(getUser)?.id;
  const typingTimeoutRef = useRef(null);
  const { stompClient, sendMessage, sendEvent } = useWebSocket();
  const isMessageNotEmpty = Boolean(message?.trim().length);
  const isGroupChat = chatData?.chatType === CHAT_TYPES.GROUP;
  const dataEventToSend = {
    authorId: userId,
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
      chatId,
      senderId: userId,
    };

    sendMessage(dataMessageToSend);
    setMessage('');
  };

  const handleJoinClick = () => {
    sendEvent(dataEventToSend, ULRs.joinToGroupChat);
    setIsShowJoinBtn(false);
    setSubscriptionRooms(prevRooms => [...prevRooms, chatData.country]);
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

export default MessageBar;
