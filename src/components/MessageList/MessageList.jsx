import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isSameDay } from 'date-fns';
import PropTypes from 'prop-types';
import MessageItem from '@/components/MessageItem/MessageItem';
import { MESSAGE_TYPES } from '@/constants/messageTypes.js';
import { getUser } from '@/redux-store/selectors.js';
import DateSeparator from '@/components/DateSeparator/DateSeparator.jsx';
import { MessageListStyled } from './MessageListStyled.js';

const MessageList = ({
  messages,
  setIsUserTyping,
  setUsersTyping,
  listOfOnlineUsersStatuses,
  unreadMessages,
  lastVisibleReadMessageRef,
}) => {
  const currentUserName = useSelector(getUser)?.userName;

  useEffect(() => {
    messages?.forEach(message => {
      const currentUser = message.user?.userName;

      if (
        message.type === MESSAGE_TYPES.START_TYPING &&
        currentUser !== currentUserName
      ) {
        setUsersTyping(prevUsers => {
          if (!prevUsers.includes(currentUser)) {
            return [...prevUsers, currentUser];
          }
          return prevUsers;
        });
      } else if (message.type === MESSAGE_TYPES.STOP_TYPING) {
        setUsersTyping(prevUsers =>
          prevUsers.filter(userName => userName !== currentUser)
        );
      }
    });
  }, [messages, setIsUserTyping, setUsersTyping, currentUserName]);

  const renderMessagesWithDateSeparator = () => {
    const sortedMessages = messages
      .slice()
      .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));

    return sortedMessages.map((message, index) => {
      const currentMessageDate = new Date(message.creationDate);
      const previousMessageDate =
        index > 0 ? new Date(sortedMessages[index - 1].creationDate) : null;

      const isDisplayableMessage =
        message.type === MESSAGE_TYPES.TEXT ||
        message.type === MESSAGE_TYPES.JOIN ||
        message.type === MESSAGE_TYPES.LEAVE;

      const showDateSeparator =
        isDisplayableMessage &&
        (index === 0 ||
          (previousMessageDate &&
            !isSameDay(currentMessageDate, previousMessageDate)));

      let nextUserMessage = null;
      for (let i = index + 1; i < sortedMessages.length; i += 1) {
        if (sortedMessages[i].type === MESSAGE_TYPES.TEXT) {
          nextUserMessage = sortedMessages[i];
          break;
        }
      }

      const isLastMessage =
        !nextUserMessage || nextUserMessage.user?.id !== message.user?.id;

      const isShownAvatar =
        message.type === MESSAGE_TYPES.TEXT && isLastMessage;

      const userStatus = listOfOnlineUsersStatuses.get(
        message.user.id.toString()
      );

      const isOnline = userStatus ? userStatus.isOnline : false;

      const isLastVisibleReadMessage =
        index === sortedMessages.length - unreadMessages.length - 1;
      return (
        <div
          key={message.id || message.creationDate}
          ref={isLastVisibleReadMessage ? lastVisibleReadMessageRef : null}
          data-message-id={message.id}
        >
          {showDateSeparator && <DateSeparator date={currentMessageDate} />}
          <MessageItem
            key={message.id || message.creationDate}
            content={message.content}
            userId={message.user?.id}
            userName={message.user?.userName}
            userAvatarUrl={message.user?.avatarUrl}
            date={message.creationDate}
            type={message.type}
            isShownAvatar={isShownAvatar}
            isOnline={isOnline}
          />
        </div>
      );
    });
  };

  return (
    <MessageListStyled>{renderMessagesWithDateSeparator()}</MessageListStyled>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  setIsUserTyping: PropTypes.func,
  setUsersTyping: PropTypes.func,
  listOfOnlineUsersStatuses: PropTypes.instanceOf(Map),
  unreadMessages: PropTypes.array,
  lastVisibleReadMessageRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export default MessageList;
