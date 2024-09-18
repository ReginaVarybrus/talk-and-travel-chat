import CountryInfo from '@/components/CountryInfo/CountryInfo';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import CountryInfo from '@/components/CountryInfo/CountryInfo';
import {
  ChatHeaderStyled,
  MobileHeaderStyled,
  DesktopHeaderStyled,
  MobileHeaderContentStyled,
  HeaderButton,
  BackIcon,
  FlagImg,
  OpenCountryInfoIcon,
} from './ChatHeaderStyled';

const ChatHeader = ({
  chatName = 'Country name',
  participantsAmount = 0,
  selectedCompanion,
  isPrivateChat,
  isUserTyping,
  userNameisTyping,
  chatId,
  isSubscribed,
  setSubscriptionRooms,
  setIsChatVisible,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const userName = useSelector(getUser)?.userName;
  const showUserIsTyping = isUserTyping && userNameisTyping !== userName;

  const handleOpen = () => {
    if (!isPrivateChat) {
      setOpenModal(true);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleBackToSearchBar = () => {
    setIsChatVisible(false);
  };

  const showUserIsTyping = isUserTyping && userNameisTyping !== userName;

  return (
    <ChatHeaderStyled>
      <MobileHeaderStyled>
        <HeaderButton onClick={handleBackToSearchBar}>
          <BackIcon />
        </HeaderButton>
        <MobileHeaderContentStyled>
          <FlagImg
            loading="lazy"
            width="36"
            srcSet={`https://flagcdn.com/w40/${countryFlagCode}.png 2x`}
            src={`https://flagcdn.com/w20/${countryFlagCode}.png`}
            alt={`${countryFlagCode} flag`}
          />
          <div>
            <h5>{countryName}</h5>
            <p>
              {showUserIsTyping
                ? `${userNameisTyping} is typing...`
                : `${participantsAmount} participants`}
            </p>
          </div>
        </MobileHeaderContentStyled>
        <HeaderButton onClick={handleOpen}>
          <OpenCountryInfoIcon />
        </HeaderButton>
      </MobileHeaderStyled>

      <DesktopHeaderStyled onClick={handleOpen}>
        <h5>{isPrivateChat ? selectedCompanion.userName : chatName}</h5>

        <p>
          {showUserIsTyping
            ? `${userNameisTyping} is typing...`
            : !isPrivateChat && `${participantsAmount} participants`}
        </p>
      </DesktopHeaderStyled>

      {!isPrivateChat && (
        <CountryInfo
          isOpen={openModal}
          onClose={handleClose}
          countryName={chatName}
          participantsAmount={participantsAmount || 0}
          chatId={chatId}
          setSubscriptionRooms={setSubscriptionRooms}
          isSubscribed={isSubscribed}
        />
      )}
    </ChatHeaderStyled>
  );
};

ChatHeader.propTypes = {
  chatName: PropTypes.string,
  participantsAmount: PropTypes.number,
  selectedCompanion: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string,
    userEmail: PropTypes.string,
  }),
  chatId: PropTypes.number,
  isPrivateChat: PropTypes.bool,
  setSubscriptionRooms: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
};

export default ChatHeader;
