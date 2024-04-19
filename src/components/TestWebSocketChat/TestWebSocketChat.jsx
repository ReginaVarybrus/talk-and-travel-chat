/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCountryData } from '@/redux-store/selectors.js';
// import { connectToCountryRoom, sendMessage } from './ws';
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
  // const [params, setParams] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  const countryName = useSelector(getCountryData)?.name;

  // const handleData = data => {
  //   console.log('Received data:', data);
  //   setParams(data);
  // };

  // connectToCountryRoom('countryName', params, handleData);

  const isInputNotEmpty = Boolean(message?.trim().length);

  // useEffect(() => {
  //   connectToCountryRoom('countryName', params, handleData);
  // }, []);

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();
    // if (!params.userId || !params.id || !params.name) {
    //   console.error('Missing parameters for sending message.');
    //   return;
    // }

    // const dataToSend = {
    //   content: message,
    //   senderId: params.userId,
    //   countryId: params.id,
    // };

    // sendMessage(params.name, dataToSend);
    setMessageList(prevMessageList => [...prevMessageList, message]);
    setMessage('');

    console.log(message);
  };

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          <h5>{countryName || 'Country Name'}</h5>
          {/* <p>{params.participants || 0} members</p> */}
        </HeaderContent>
      </Header>

      <MessageBlock>
        <MessageList messages={messageList} />
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
