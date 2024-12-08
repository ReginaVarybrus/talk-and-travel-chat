import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import URLs from '@/constants/constants';
import { CHAT_TYPES } from '@/constants/chatTypes';
import { useWebSocket } from '@/hooks/useWebSocket.js';
import BasicButton from '@/components/Buttons/BasicButton/BasicButton';
import ModalAttachFile from '@/components/ModalAttachFile/ModalAttachFile';
import { CloseBtn } from '@/components//AllUsersModal/AllUsersModalStyled';
import { useChatContext } from '@/providers/ChatProvider';
import { IoCloseOutline } from 'react-icons/io5';

import {
  MessageBarStyled,
  ButtonJoinWrapper,
  MessageInputs,
  ButtonAttachFile,
  VisuallyHiddenInput,
  AttachmentIcon,
  TextareaStyled,
  TextareaAutosize,
  ButtonSendMessage,
  SendIcon,
  MaxLimitPopup,
  ReplyMessageBox,
  MessageInputBox,
} from './MessageBarStyled';

const MessageBar = ({
  chatId,
  chatData,
  isShowJoinBtn,
  setIsShowJoinBtn,
  isUserTyping,
  setIsUserTyping,
  scrollToBottom,
  replyToMessage,
  setReplyToMessage,
}) => {
  const [message, setMessage] = useState('');
  const [isMaxLimit, setIsMaxLimit] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { setSubscriptionRooms } = useChatContext();
  const typingStopTimeoutRef = useRef(null);
  const MAX_CHAR_LIMIT = 1000;
  const { stompClient, sendMessageOrEvent } = useWebSocket();
  const isMessageNotEmpty = Boolean(message?.trim().length);
  const isGroupChat = chatData?.chatType === CHAT_TYPES.GROUP;

  const dataEventToSend = {
    chatId,
  };

  const handleStartTyping = () => {
    if (!isUserTyping) {
      setIsUserTyping(true);
      sendMessageOrEvent(dataEventToSend, URLs.startTyping);
    }
  };

  const handleStopTyping = () => {
    setIsUserTyping(false);
    sendMessageOrEvent(dataEventToSend, URLs.stopTyping);
  };

  const handleChange = ({ target: { value } }) => {
    if (value.length >= MAX_CHAR_LIMIT) {
      setIsMaxLimit(true);
    } else {
      setIsMaxLimit(false);
    }
    setMessage(value.slice(0, MAX_CHAR_LIMIT));

    handleStartTyping();

    if (typingStopTimeoutRef.current) {
      clearTimeout(typingStopTimeoutRef.current);
    }

    typingStopTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 1500);
  };

  // Attachment image feature
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      console.log('selected file', file);
      setSelectedFile(file);
      setOpen(true);
      event.target.value = null;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!stompClient || !isMessageNotEmpty) {
      console.error(
        'Cannot send message: WebSocket not connected or message is empty'
      );
      return;
    }

    const dataMessageToSend = {
      content: message.trim(),
      chatId,
      repliedMessageId: replyToMessage?.id || null,
    };
    sendMessageOrEvent(dataMessageToSend, URLs.sendMessage);
    setMessage('');
    setIsMaxLimit(false);
    setReplyToMessage(null);
    handleStopTyping();
    clearTimeout(typingStopTimeoutRef.current);

    setTimeout(() => {
      scrollToBottom();
    }, 500);
  };

  const handleCancelReply = () => {
    if (replyToMessage) {
      setReplyToMessage(null);
    }
  };

  const handleJoinClick = () => {
    sendMessageOrEvent(dataEventToSend, URLs.joinToGroupChat);
    setIsShowJoinBtn(false);
    setSubscriptionRooms(prevRooms => [...prevRooms, chatData]);
  };

  useEffect(() => {
    setMessage('');
    setIsMaxLimit(false);
  }, [chatId]);

  const handleClose = () => setOpen(false);

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
        <MessageInputBox>
          {replyToMessage && (
            <ReplyMessageBox>
              <h6>Reply to {replyToMessage.userName} </h6>
              <p>{replyToMessage.content}</p>
              <CloseBtn onClick={handleCancelReply}>
                <IoCloseOutline />
              </CloseBtn>
            </ReplyMessageBox>
          )}
          <MessageInputs onSubmit={handleSubmit}>
            <ButtonAttachFile
              component="label"
              variant="contained"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            >
              <AttachmentIcon />
              <VisuallyHiddenInput type="file" />
            </ButtonAttachFile>
            <TextareaStyled>
              <TextareaAutosize
                maxRows={10}
                aria-label="empty textarea"
                placeholder="Type here"
                value={message}
                onKeyUp={e => {
                  if (e.key === 'Enter' && !e.shiftKey && isMessageNotEmpty) {
                    handleSubmit(e);
                  }
                }}
                onChange={handleChange}
                maxLength={MAX_CHAR_LIMIT}
              />
              {isMaxLimit && (
                <MaxLimitPopup>
                  You&apos;ve reached the character limit!
                </MaxLimitPopup>
              )}
            </TextareaStyled>
            <ButtonSendMessage
              type="submit"
              value="Send"
              $isMessageNotEmpty={isMessageNotEmpty}
              disabled={!isMessageNotEmpty}
            >
              <SendIcon />
            </ButtonSendMessage>
          </MessageInputs>
        </MessageInputBox>
      )}
      <ModalAttachFile
        open={open}
        handleClose={handleClose}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        chatId={chatId}
        src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
      />
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
  isShowJoinBtn: PropTypes.bool,
  setIsShowJoinBtn: PropTypes.func,
  isUserTyping: PropTypes.bool,
  setIsUserTyping: PropTypes.func,
  scrollToBottom: PropTypes.func,
};

export default MessageBar;
