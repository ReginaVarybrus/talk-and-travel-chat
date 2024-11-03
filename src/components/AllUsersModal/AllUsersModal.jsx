import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import URLs from '@/constants/constants';
import { getUser } from '@/redux-store/selectors';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import { routesPath } from '@/routes/routesConfig.jsx';
import { useChatContext } from '@/providers/ChatProvider';
import { axiosClient } from '@/services/api';
import { BiArrowBack } from 'react-icons/bi';
import {
  BoxStyled,
  CloseBtn,
  Item,
  LetterAvatar,
  SearchInput,
  SendMessageBtn,
  UsersList,
  IconSearch,
  SearchBox,
  Subtitle,
  Title,
  AboutUser,
  InfoIcon,
  UserInfo,
  ButtonBack,
  MoreInfoBtn,
  MainBoxStyled,
  UserName,
  AvatarInList,
  AvatarInUserBlock,
  UserInfoBox,
  UserContact,
  LetterAvatarInUserBlock,
} from './AllUsersModalStyled';

const AllUsersModal = ({ isOpen, onClose }) => {
  const currentUserId = useSelector(getUser)?.id;
  const [searchedValue, setSearchedValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { dataUserChats, updateUserChats } = useChatContext();
  const { responseData: users } = useFetch(URLs.getAllUsers);
  const navigate = useNavigate();

  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (users && currentUserId) {
      setFilteredUsers(users.filter(user => user.id !== currentUserId));
    }
  }, [users, currentUserId]);

  useEffect(() => {
    if (onClose) {
      setSearchedValue('');
      setFilteredUsers(users);
      setOpenUserInfo(false);
    }
  }, [onClose, users]);

  const checkExistingPrivateChat = id => {
    const isExist = dataUserChats?.find(chat => chat.companion.id === id);
    return isExist && isExist.chat.id;
  };

  const handleCreatePrivateChat = async (id, userName, userEmail) => {
    try {
      const existingChatId = checkExistingPrivateChat(id);

      if (existingChatId) {
        navigate(routesPath.DMS, {
          state: {
            privateChatId: existingChatId,
            companionObject: { id, userName, userEmail },
          },
        });
      } else {
        const response = await axiosClient.post(URLs.createPrivateChat, {
          companionId: id,
        });
        const privateChatId = response.data;
        await updateUserChats();
        navigate(routesPath.DMS, {
          state: {
            privateChatId,
            companionObject: { id, userName, userEmail },
          },
        });
      }
    } catch (error) {
      console.error('Error creating or navigating to private chat:', error);
    }
    onClose();
  };

  const handleSearchChange = e => {
    const value = e.target.value.toLowerCase();
    setSearchedValue(value);
    setFilteredUsers(
      users
        .filter(user => user.id !== currentUserId)
        .filter(user => user.userName.toLowerCase().startsWith(value))
    );
  };

  const handleOpenUserInfo = async userId => {
    try {
      const userInfoResponse = await axiosClient.get(URLs.userInfo(userId));
      setUserInfo(userInfoResponse.data);
      setOpenUserInfo(true);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  const handleBackToUsers = () => {
    setOpenUserInfo(false);
  };
  return (
    <Modal
      aria-labelledby="country-info-title"
      aria-describedby="country-info-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
    >
      <BoxStyled>
        <CloseBtn type="button" onClick={onClose} aria-label="close-modal">
          <IoCloseOutline />
        </CloseBtn>

        <Title>Search and Message Users</Title>
        {!openUserInfo ? (
          <SearchBox>
            <SearchInput
              type="text"
              value={searchedValue}
              onChange={handleSearchChange}
              placeholder="Search user..."
            />
            <IconSearch />
          </SearchBox>
        ) : (
          <ButtonBack
            onClick={handleBackToUsers}
            type="button"
            aria-label="back to list"
          >
            <BiArrowBack />
          </ButtonBack>
        )}
        <MainBoxStyled>
          {!openUserInfo ? (
            <UsersList>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <Item key={user.id}>
                    <UserName>
                      <AvatarInList>
                        {user.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.userName}
                            width="48"
                            height="48"
                          />
                        ) : (
                          <LetterAvatar>
                            {user.userName.charAt(0).toUpperCase()}
                          </LetterAvatar>
                        )}
                      </AvatarInList>
                      <h5>{user.userName}</h5>
                    </UserName>

                    <MoreInfoBtn
                      onClick={() => handleOpenUserInfo(user.id)}
                      type="button"
                    >
                      More...
                    </MoreInfoBtn>
                  </Item>
                ))
              ) : (
                <Subtitle>No companions found with this name</Subtitle>
              )}
            </UsersList>
          ) : (
            <UserInfoBox>
              <UserContact>
                <AvatarInUserBlock>
                  {userInfo.avatarUrl ? (
                    <img
                      src={userInfo.avatarUrl}
                      alt={userInfo.userName}
                      width="48"
                      height="48"
                    />
                  ) : (
                    <LetterAvatarInUserBlock>
                      {userInfo.userName.charAt(0).toUpperCase()}
                    </LetterAvatarInUserBlock>
                  )}
                </AvatarInUserBlock>
                <UserInfo>
                  <h5>{userInfo.userName}</h5>
                  <p>{userInfo.userEmail}</p>
                </UserInfo>
              </UserContact>
              <AboutUser>
                <InfoIcon />
                <p>
                  {userInfo.about ||
                    `${userInfo.userName} hasn't added a description yet. But soon this space will be filled with interesting facts and stories.`}
                </p>
              </AboutUser>

              <SendMessageBtn
                onClick={() =>
                  handleCreatePrivateChat(
                    userInfo.id,
                    userInfo.userName,
                    userInfo.userEmail
                  )
                }
              >
                Message
              </SendMessageBtn>
            </UserInfoBox>
          )}
        </MainBoxStyled>
      </BoxStyled>
    </Modal>
  );
};

export default AllUsersModal;