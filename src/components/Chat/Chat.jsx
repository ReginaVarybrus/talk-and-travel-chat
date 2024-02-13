import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  ChatStyled,
  Header,
  HeaderContent,
  MessageBlock,
  MessageBarWrapper,
  MessageBar,
  ButtonAttachFile,
  VisuallyHiddenInput,
  TextareaAutosize,
  ButtonSendMessage,
} from './ChatStyled';
import Icons from '../Icons/Icons';
import {
  getCountryName,
  getNumberOfParticipants,
} from '@/redux-store/AuthOperations/selectors.js';

const Chat = () => {
  const countryName = useSelector(getCountryName);
  const participants = useSelector(getNumberOfParticipants);
  const [value, setValue] = useState('');

  const textAreaRef = useRef(null);

  const isInputNotEmpty = Boolean(value?.trim().length);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          {<h5>{countryName || 'Country Name'}</h5>}
          {<p>{participants || 0} members</p>}
        </HeaderContent>
      </Header>
      <MessageBlock />
      <MessageBarWrapper>
        <MessageBar>
          <ButtonAttachFile component="label" variant="contained">
            <Icons name="attach-file" fill="var(--color-grey-9)" size="24" />
            <VisuallyHiddenInput type="file" />
          </ButtonAttachFile>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Type here"
            value={value}
            onChange={handleChange}
            ref={textAreaRef}
            maxLength="1000"
          />
          <ButtonSendMessage isInputNotEmpty={isInputNotEmpty}>
            <Icons name="send" fill="var(--color-grey-9)" size="24" />
          </ButtonSendMessage>
        </MessageBar>
      </MessageBarWrapper>
    </ChatStyled>
  );
};

export default Chat;
