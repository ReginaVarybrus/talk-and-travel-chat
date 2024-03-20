/* eslint-disable react/button-has-type */

import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  // getUserName,
  // getCountryName,
  getNumberOfParticipants,
  getUserId,
} from '@/redux-store/AuthOperations/selectors.js';
import {
  ChatStyled,
  Header,
  HeaderContent,
  MessageBlock,
  MessageBarWrapper,
  // ButtonAttachFile,
  // VisuallyHiddenInput,
} from '../Chat/ChatStyled.js';
import {
  MessageBar,
  // ButtonAttachFile,
  // VisuallyHiddenInput,
  TextareaAutosize,
  ButtonSendMessage,
} from './TestWebSocketChatStyled.js';

// eslint-disable-next-line import/no-named-as-default
import MessageList from '../MessageList/MessageList';
import { connect, sendMessage } from './ws';

const Chat = ({ countryName }) => {
  // const { search } = useLocation();
  // const [params, setParams] = useState({ countryId: '', senderId: '' });

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  // const countryName = useSelector(getCountryName);
  const participants = useSelector(getNumberOfParticipants);
  const userId = useSelector(getUserId);

  const isInputNotEmpty = Boolean(message?.trim().length);

  // useEffect(() => {
  //   const searchParams = Object.fromEntries(new URLSearchParams(search));
  //   setParams(searchParams);
  //   socket.emit('/api/group-message', searchParams);
  // }, [search]);

  // useEffect(() => {
  //   socket.on('/topic/group-message', ({ data }) => {
  //     setState(_state => [..._state, data]);
  //   });
  // }, []);

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage({
      senderId: userId,
      // countryId: countryName,
      content: message,
    });
    setMessageList(message);
    setMessage('');

    console.log(message);
  };

  const handleConnect = () => {
    connect();

    console.log('connected');
  };

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          <h5>{countryName || 'Country Name'}</h5>
          <p>{participants || 0} members</p>
        </HeaderContent>
      </Header>

      <MessageBlock>
        <MessageList messages={messageList} />
      </MessageBlock>

      <MessageBarWrapper>
        <MessageBar onSubmit={handleSubmit}>
          <button onClick={handleConnect}>Connect</button>
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
            isInputNotEmpty={isInputNotEmpty}
          />
        </MessageBar>
      </MessageBarWrapper>
    </ChatStyled>
  );
};

export default Chat;

// library data

// import React, { useState, useEffect } from 'react';
// import { socket } from './socket';
// import { ConnectionState } from './components/ConnectionState';
// import { ConnectionManager } from './components/ConnectionManager';
// import { Events } from "./components/Events";
// import { MyForm } from './components/MyForm';

// export default function App() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [fooEvents, setFooEvents] = useState([]);

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     function onFooEvent(value) {
//       setFooEvents(previous => [...previous, value]);
//     }

//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);
//     socket.on('foo', onFooEvent);

//     return () => {
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//       socket.off('foo', onFooEvent);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <ConnectionState isConnected={ isConnected } />
//       <Events events={ fooEvents } />
//       <ConnectionManager />
//       <MyForm />
//     </div>
//   );
// }
