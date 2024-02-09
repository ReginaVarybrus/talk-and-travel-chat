import React from 'react';
// import { useSelector } from 'react-redux';
import {
  Wrapper,
  Header,
  HeaderContent,
  MessageBlock,
  MessageBarWrapper,
  MessageBar,
  Input,
  Button,
} from './ChatStyled';
import Icons from '../Icons/Icons';
// import { getCountryName } from 'redux-store/AuthOperations/selectors';

export default function Chat() {
  // const countryName = useSelector(getCountryName);

  return (
    <Wrapper>
      <Header>
        <HeaderContent>
          <h5>Country Name</h5>
          <p>members</p>
        </HeaderContent>
      </Header>
      <MessageBlock></MessageBlock>
      <MessageBarWrapper>
        <MessageBar>
          <Button>
            <Icons name="attach-file" fill="var(--color-grey-9)" size="24" />
          </Button>
          <Input type="text" placeholder="Type here" />
          <Button>
            <Icons name="send" fill="var(--color-grey-9)" size="24" />
          </Button>
        </MessageBar>
      </MessageBarWrapper>
    </Wrapper>
  );
}
