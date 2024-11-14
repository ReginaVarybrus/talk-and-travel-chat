import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import URLs from '@/constants/constants';
import { getUser, getUsersStatuses } from '@/redux-store/selectors';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import { routesPath } from '@/routes/routesConfig.jsx';
import { useChatContext } from '@/providers/ChatProvider';
import { axiosClient } from '@/services/api';
import { BiArrowBack } from 'react-icons/bi';
import { Badge } from '@/components/MessageItem/MessageItemStyled';
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
  AvatarImg,
  ModalWindowStyled,
} from './AllUsersModalStyled';
import { ImgAvatar } from '../CountryInfo/CountryInfoStyled';

const AllUsersModal = ({ isOpen, onClose }) => {
  const currentUserId = useSelector(getUser)?.id;
  const usersStatuses = useSelector(getUsersStatuses);
  const [searchedValue, setSearchedValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const { dataUserChats, updateUserChats } = useChatContext();
  const { responseData: users } = useFetch(URLs.getAllUsers);
  const navigate = useNavigate();

  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (isOpen && users && currentUserId) {
      setFilteredUsers(users.filter(user => user.id !== currentUserId));
    }
  }, [isOpen, users, currentUserId]);

  useEffect(() => {
    if (!isOpen) {
      setSearchedValue('');
      setFilteredUsers([]);
      setOpenUserInfo(false);
    }
  }, [isOpen]);

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
    const { value } = e.target;
    setSearchedValue(value);

    setFilteredUsers(
      users
        .filter(user => user.id !== currentUserId)
        .filter(user => {
          const fullName = user.userName.toLowerCase();
          const [firstName, lastName] = fullName.split(' ');
          return (
            fullName.startsWith(value.toLowerCase()) ||
            (firstName && firstName.startsWith(value.toLowerCase())) ||
            (lastName && lastName.startsWith(value.toLowerCase()))
          );
        })
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
    <ModalWindowStyled
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
                filteredUsers.map(user => {
                  const userStatus = usersStatuses.find(
                    userFind => userFind.userId === user.id
                  );

                  const isOnline = userStatus
                    ? userStatus.status.isOnline
                    : false;

                  return (
                    <Item key={user.id}>
                      <UserName>
                        <AvatarInList>
                          {user.avatar ? (
                            <ImgAvatar
                              src={user.avatar?.image50x50}
                              alt={user.userName}
                            />
                          ) : (
                            <LetterAvatar>
                              {user.userName[0].toUpperCase()}
                            </LetterAvatar>
                          )}
                          {isOnline && <Badge />}
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
                  );
                })
              ) : (
                <Subtitle>No companions found with this name</Subtitle>
              )}
            </UsersList>
          ) : (
            <UserInfoBox>
              <UserContact>
                <AvatarInUserBlock>
                  {userInfo.avatar ? (
                    <AvatarImg
                      src={userInfo.avatar.image256x256}
                      alt={`${userInfo.userName}'s avatar`}
                    />
                  ) : (
                    <LetterAvatarInUserBlock>
                      {userInfo.userName[0].toUpperCase()}
                    </LetterAvatarInUserBlock>
                  )}
                </AvatarInUserBlock>
                <UserInfo>
                  <h5>{userInfo.userName}</h5>
                  <p title={userInfo.userEmail}>{userInfo.userEmail}</p>
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
    </ModalWindowStyled>
  );
};

export default AllUsersModal;
