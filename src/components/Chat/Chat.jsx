import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Wrapper,
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
} from 'redux-store/AuthOperations/selectors';

const Chat = () => {
  const countryName = useSelector(getCountryName);
  const participants = useSelector(getNumberOfParticipants);
  const [value, setValue] = useState('');

  const textAreaRef = useRef(null);

  const isInputNotEmpty = value.trim() !== '';

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Header>
        <HeaderContent>
          {<h5>{countryName || 'Country Name'}</h5>}
          {<p>{participants || 0} members</p>}
        </HeaderContent>
      </Header>
      <MessageBlock></MessageBlock>
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
          <ButtonSendMessage border={isInputNotEmpty}>
            <Icons name="send" fill="var(--color-grey-9)" size="24" />
          </ButtonSendMessage>
        </MessageBar>
      </MessageBarWrapper>
    </Wrapper>
  );
};

export default Chat;
