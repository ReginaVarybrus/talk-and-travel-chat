import { useSelector } from 'react-redux';
import { getCountryName } from '@/redux-store/selectors.js';
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
import { ChatStyled, Header, HeaderContent, MessageBlock } from './ChatStyled';
import MessageBar from '../MessageBar/MessageBar';

const Chat = () => {
  const countryName = useSelector(getCountryName);
  const [value, setValue] = useState('');
  const textAreaRef = useRef(null);
  const isInputNotEmpty = Boolean(value?.trim().length);

  const handleChange = e => {
    setValue(e.target.value);
  };
  const participants = useSelector(getNumberOfParticipants);

  return (
    <ChatStyled>
      <Header>
        <HeaderContent>
          <h5>{countryName || 'Country Name'}</h5>
        </HeaderContent>
      </Header>
      <MessageBlock />
      <MessageBar />
    </ChatStyled>
  );
};

export default Chat;
