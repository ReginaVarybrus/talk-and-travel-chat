import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUser } from '@/redux-store/selectors.js';
import CountryInfo from '@/components/CountryInfo/CountryInfo';
import { MoreIcon } from '@/components/TapBar/TapBarStyled.js';
import {
  ChatHeaderStyled,
  MobileHeaderStyled,
  DesktopHeaderStyled,
  MobileHeaderContentStyled,
  HeaderButton,
  BackIcon,
  FlagImg,
} from './ChatHeaderStyled';

const ChatHeader = ({
  countryName = 'Country Name',
  participantsAmount = 0,
  countryChatId,
  countryFlagCode,
  setSubscriptionCountryRooms,
  isSubscribed,
  isUserTyping,
  userNameisTyping,
  setIsChatVisible,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const userName = useSelector(getUser)?.userName;
  const handleOpen = () => setOpenModal(true);
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
            // width="36"
            // height="36"
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
          <MoreIcon />
        </HeaderButton>
      </MobileHeaderStyled>

      <DesktopHeaderStyled onClick={handleOpen}>
        <h5>{countryName}</h5>
        <p>
          {showUserIsTyping
            ? `${userNameisTyping} is typing...`
            : `${participantsAmount} participants`}
        </p>
      </DesktopHeaderStyled>

      <CountryInfo
        isOpen={openModal}
        onClose={handleClose}
        countryName={countryName}
        participantsAmount={participantsAmount}
        countryChatId={countryChatId}
        setSubscriptionCountryRooms={setSubscriptionCountryRooms}
        isSubscribed={isSubscribed}
      />
    </ChatHeaderStyled>
  );
};

ChatHeader.propTypes = {
  countryName: PropTypes.string,
  participantsAmount: PropTypes.number,
  countryChatId: PropTypes.number,
  countryFlagCode: PropTypes.string,
  setSubscriptionCountryRooms: PropTypes.func,
  isSubscribed: PropTypes.bool,
  isUserTyping: PropTypes.bool,
  userNameisTyping: PropTypes.string,
};

export default ChatHeader;
