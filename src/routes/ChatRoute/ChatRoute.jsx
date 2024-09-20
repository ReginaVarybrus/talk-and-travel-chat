import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { getUser } from '@/redux-store/selectors.js';
import { useFetch } from '@/hooks/useFetch.js';
// import { axiosClient } from '@/services/api';
import ULRs from '@/redux-store/constants';
import SearchBar from '@/components/SearchBar/SearchBar';
import Chat from '@/components/Chat/Chat';
import { ChatRouteStyled } from './ChatRouteStyled.js';

const ChatRoute = () => {
  const [chatData, setChatData] = useState({});
  const [subscriptionRooms, setSubscriptionRooms] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isShowJoinBtn, setIsShowJoinBtn] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  // const userId = useSelector(getUser)?.id;
  const { responseData: dataUserCountries } = useFetch(ULRs.userCountries);

  useEffect(() => {
    if (dataUserCountries) {
      setSubscriptionRooms(dataUserCountries);
    }
  }, [dataUserCountries]);

  return (
    <ChatRouteStyled>
      <SearchBar
        setChatData={setChatData}
        subscriptionRooms={subscriptionRooms}
        setSubscriptionRooms={setSubscriptionRooms}
        setIsSubscribed={setIsSubscribed}
        setIsShowJoinBtn={setIsShowJoinBtn}
        setSelectedCompanion={setSelectedCompanion}
      />

      <Chat
        chatData={chatData}
        setChatData={setChatData}
        setSubscriptionRooms={setSubscriptionRooms}
        isSubscribed={isSubscribed}
        isShowJoinBtn={isShowJoinBtn}
        setIsShowJoinBtn={setIsShowJoinBtn}
        selectedCompanion={selectedCompanion}
        setSelectedCompanion={setSelectedCompanion}
      />
    </ChatRouteStyled>
  );
};

export default ChatRoute;
