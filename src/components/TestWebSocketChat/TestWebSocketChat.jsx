/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getCountryData } from '@/redux-store/selectors.js';
import { sendMessage } from './ws';
import {
  ChatStyled,
  Header,
  HeaderContent,
  MessageBlock,
  MessageBarWrapper,
  ButtonAttachFile,
  VisuallyHiddenInput,
} from '../Chat/ChatStyled.js';
import {
  MessageBar,
  TextareaAutosize,
  ButtonSendMessage,
} from './TestWebSocketChatStyled.js';
import Icons from '../Icons/Icons';
import { MessageList } from '../MessageList/MessageList';

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  const countryName = useSelector(getCountryData)?.name;
  const countryId = useSelector(getCountryData)?.id;
  const user = useSelector(getUser);

  const isInputNotEmpty = Boolean(message?.trim().length);

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();

    const dataToSend = {
      content: message,
      senderId: user.id,
      countryId,
    };

    sendMessage(countryName, dataToSend);
    setMessageList(prevMessageList => [...prevMessageList, message]);
    setMessage('');

    console.log(message);
  };

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          <h5>{countryName || 'Country Name'}</h5>
        </HeaderContent>
      </Header>

      <MessageBlock>
        <MessageList messages={messageList} username={user.name} />
      </MessageBlock>

      <MessageBarWrapper>
        <MessageBar onSubmit={handleSubmit}>
          <ButtonAttachFile component="label" variant="contained">
            <Icons name="attach-file" fill="var(--color-grey-9)" size="24" />
            <VisuallyHiddenInput type="file" />
          </ButtonAttachFile>
          <TextareaAutosize
            type="text"
            name="message"
            placeholder="Type here (test)"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <ButtonSendMessage
            type="submit"
            onSubmit={handleSubmit}
            value="Send"
            $isInputNotEmpty={isInputNotEmpty}
          />
        </MessageBar>
      </MessageBarWrapper>
    </ChatStyled>
  );
};

export default Chat;
