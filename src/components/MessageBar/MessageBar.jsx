import { useState, useRef } from 'react';
import {
  MessageBarStyled,
  MessageInputs,
  ButtonAttachFile,
  VisuallyHiddenInput,
  AttachmentIcon,
  TextareaAutosize,
  ButtonSendMessage,
  SendIcon,
} from './MessageBarStyled';

const MessageBar = () => {
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);

  const isInputNotEmpty = Boolean(value?.trim().length);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <MessageBarStyled>
      <MessageInputs>
        <ButtonAttachFile component="label" variant="contained">
          <AttachmentIcon />
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
        <ButtonSendMessage $isInputNotEmpty={isInputNotEmpty}>
          <SendIcon />
        </ButtonSendMessage>
      </MessageInputs>
    </MessageBarStyled>
  );
};

export default MessageBar;
