import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors';
import URLs from '@/constants/constants';
import { axiosClient } from '@/services/api';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import { ATTACHMENT_TYPES } from '@/constants/attachmentTypes.js';
import PropTypes from 'prop-types';
import UserInfoModal from '@/components/UserInfoModal/UserInfoModal';
import AttachImageModal from '@/components/AttachImageModal/AttachImageModal';
import { timeStampConverter } from '@/components/utils/timeUtil.js';
import { FaReply } from 'react-icons/fa6';

import {
  MessageItemStyled,
  MessageContentStyled,
  Avatar,
  ImgAvatar,
  LetterAvatarStyled,
  ContentMessage,
  ContentJoinOrLeave,
  Time,
  Badge,
  ButtonReply,
  ReplyingMessage,
  MessageBox,
  MessageAttachBox,
  NameBox,
  AttachmentImage,
} from './MessageItemStyled';

const MessageItem = ({
  content,
  userId,
  userName,
  userAvatarUrl,
  date,
  type,
  attachment,
  isShownAvatar,
  isOnline,
  isPrivateChat,
  setParticipantsAmount,
  chatOpenedTime,
  onReply,
  replyMessageId,
  repliedMessage,
  fetchMessageById,
}) => {
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const currentUserId = useSelector(getUser)?.id;
  const time = timeStampConverter(date);
  const isCurrentUser = userId === currentUserId;

  if ([MESSAGE_TYPES.START_TYPING, MESSAGE_TYPES.STOP_TYPING].includes(type)) {
    return null;
  }

  const messageTypeText = type === MESSAGE_TYPES.TEXT;
  const messageTypeJoin = type === MESSAGE_TYPES.JOIN;
  const messageTypeLeave = type === MESSAGE_TYPES.LEAVE;
  const attachmentTypeImage = attachment?.type === ATTACHMENT_TYPES.IMAGE;

  useEffect(() => {
    const messageDate = new Date(date);
    const openedDate = new Date(chatOpenedTime);

    if (chatOpenedTime && messageDate > openedDate) {
      if (messageTypeJoin) {
        setParticipantsAmount(prevCount => prevCount + 1);
      } else if (messageTypeLeave) {
        setParticipantsAmount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
      }
    }
  }, [type, setParticipantsAmount, date, chatOpenedTime]);

  const handleOpen = async () => {
    if (isCurrentUser || isPrivateChat) {
      return;
    }

    try {
      const userInfoResponse = await axiosClient.get(URLs.userInfo(userId));
      setUserInfo(userInfoResponse.data);

      if (userInfoResponse.data.userName) {
        setOpen(true);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleOpenImage = () => {
    setOpenImage(true);
    console.log(attachment.thumbnailImageUrl);
  };

  const checkToShowAvatar = messageTypeText && userId && isShownAvatar;
  const handleClose = () => setOpen(false);
  const handleCloseImage = () => setOpenImage(false);

  const handleReplyClick = () => {
    if (onReply) {
      onReply({
        id: replyMessageId,
        content,
        userName,
      });
    }
  };

  const handleScrollToRepliedMessage = () => {
    if (repliedMessage) {
      const repliedMessageElement = document.getElementById(
        `message-${repliedMessage.id}`
      );
      if (repliedMessageElement) {
        repliedMessageElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        repliedMessageElement.classList.add('highlight');
        setTimeout(() => {
          repliedMessageElement.classList.remove('highlight');
        }, 1000);
      } else if (fetchMessageById) {
        fetchMessageById(repliedMessage.id);
      }
    }
  };

  return (
    <MessageItemStyled $isShownAvatar={isShownAvatar}>
      {checkToShowAvatar && (
        <Avatar
          $isCurrentUser={isCurrentUser}
          $isPrivateChat={isPrivateChat}
          onClick={!isCurrentUser && !isPrivateChat ? handleOpen : undefined}
        >
          <ImgAvatar
            src={userAvatarUrl?.image50x50 || undefined}
            alt={`${userName}'s avatar`}
            $userAvatarUrl={userAvatarUrl}
          />
          {!userAvatarUrl?.image50x50 && (
            <LetterAvatarStyled>{userName[0].toUpperCase()}</LetterAvatarStyled>
          )}
          {isOnline && <Badge />}
        </Avatar>
      )}

      {messageTypeText && (
        <MessageContentStyled
          $backgroundMessage={isCurrentUser}
          $isShownAvatar={isShownAvatar}
        >
          {repliedMessage && (
            <ReplyingMessage
              $backgroundMessage={isCurrentUser}
              onClick={handleScrollToRepliedMessage}
            >
              <NameBox>
                <FaReply />
                <h5>{repliedMessage.user.userName}</h5>
              </NameBox>
              <p>{repliedMessage.content}</p>
            </ReplyingMessage>
          )}

          {attachment && attachmentTypeImage ? (
            <MessageAttachBox>
              <AttachmentImage
                onClick={handleOpenImage}
                src={attachment.thumbnailImageUrl}
                alt="attachment image"
              />
              <Time>{time || 'time'}</Time>
              <ButtonReply onClick={handleReplyClick}>
                <FaReply />
              </ButtonReply>
            </MessageAttachBox>
          ) : (
            <MessageBox>
              <ContentMessage>{content || `message`}</ContentMessage>
              <Time>{time || 'time'}</Time>
              <ButtonReply onClick={handleReplyClick}>
                <FaReply />
              </ButtonReply>
            </MessageBox>
          )}
        </MessageContentStyled>
      )}

      {(messageTypeJoin || messageTypeLeave) && (
        <ContentJoinOrLeave>{content || `message`}</ContentJoinOrLeave>
      )}

      <UserInfoModal
        open={open}
        handleClose={handleClose}
        userAvatarUrl={userInfo?.avatar?.image256x256}
        userName={userInfo?.userName}
        userEmail={userInfo?.userEmail}
        about={userInfo?.about}
        id={userInfo?.id}
      />
      <AttachImageModal
        openImage={openImage}
        handleCloseImage={handleCloseImage}
        src={attachment?.thumbnailImageUrl}
      />
    </MessageItemStyled>
  );
};

MessageItem.propTypes = {
  content: PropTypes.string,
  userId: PropTypes.number,
  userName: PropTypes.string,
  userAvatarUrl: PropTypes.shape({
    image50x50: PropTypes.string,
    image256x256: PropTypes.string,
  }),
  date: PropTypes.string,
  type: PropTypes.string,
  isShownAvatar: PropTypes.bool,
  isOnline: PropTypes.bool,
  setParticipantsAmount: PropTypes.func,
  chatOpenedTime: PropTypes.instanceOf(Date),
};

export default MessageItem;
