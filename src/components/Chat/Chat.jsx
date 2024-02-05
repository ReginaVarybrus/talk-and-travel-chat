import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Wrapper,
  Header,
  HeaderContent,
  MessageBlock,
  MessageBarWrapper,
  MessageBar,
  ButtonAddFile,
  Input,
  ButtonSendMessage,
} from './ChatStyled';
import Icons from '../Icons/Icons';
import {
  getCountryName,
  getNumberOfParticipants,
} from 'redux-store/AuthOperations/selectors';

export default function Chat() {
  const countryName = useSelector(getCountryName);
  const participants = useSelector(getNumberOfParticipants);

  const [messageBlockHeight, setMessageBlockHeight] = useState(0);
  const [value, setValue] = useState('');

  // const fileInput = React.createRef();
  const textAreaRef = useRef(null);

  const handleChange = e => {
    setValue(e.target.value);
    console.log(value);
  };

  const isInputNotEmpty = value.trim() !== '';

  const updateMessageBlockHeight = () => {
    if (textAreaRef.current) {
      setMessageBlockHeight(textAreaRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    updateMessageBlockHeight();
  }, [value]);

  useEffect(() => {
    const handleResize = () => {
      updateMessageBlockHeight();
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Wrapper>
      <Header>
        <HeaderContent>
          {!countryName ? <h5>Country Name</h5> : <h5>{countryName}</h5>}
          {participants != null ? (
            <p>{participants} members</p>
          ) : (
            <p>0 members</p>
          )}
        </HeaderContent>
      </Header>
      <MessageBlock style={{ height: messageBlockHeight + 'px' }}></MessageBlock>
      <MessageBarWrapper>
        <MessageBar>
          {/* <ButtonAddFile type="file" ref={fileInput}> */}
          <ButtonAddFile>
            <Icons name="attach-file" fill="var(--color-grey-9)" size="24" />
          </ButtonAddFile>
          <Input
            type="text"
            placeholder="Type here"
            value={value}
            onChange={handleChange}
            ref={textAreaRef}
            maxLength="1000"
            rows="1"
            style={{height: '48px'}}
          />
          <ButtonSendMessage style={{ border: isInputNotEmpty ? '1px solid var(--color-brand-blue)' : '1px solid var(--color-grey-6)' }}>
            <Icons name="send" fill="var(--color-grey-9)" size="24" />
          </ButtonSendMessage>
        </MessageBar>
      </MessageBarWrapper>
    </Wrapper>
  );
}
