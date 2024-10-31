import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import URLs from '@/constants/constants';
import { getUser } from '@/redux-store/selectors';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import { routesPath } from '@/routes/routesConfig.jsx';
import { useChatContext } from '@/providers/ChatProvider';
import { axiosClient } from '@/services/api';

import {
  Avatar,
  BoxStyled,
  CloseBtn,
  Item,
  LetterAvatar,
  SendMessageBtn,
  UserContactInfo,
  UsersBoxStyled,
  UsersList,
} from './AllUsersModalStyled';

const AllUsersModal = ({ isOpen, onClose }) => {
  const currentUserId = useSelector(getUser)?.id;
  const { dataUserChats, updateUserChats } = useChatContext();
  const { responseData: users } = useFetch(URLs.getAllUsers, '');
  const navigate = useNavigate();

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
        <UsersBoxStyled>
          <UsersList>
            {users &&
              users.map(user => (
                <Item key={user.id}>
                  <Avatar>
                    {user.avatarUrl ? (
                      <img
                        src={user.avatar}
                        alt={user.userName}
                        width="48"
                        height="48"
                      />
                    ) : (
                      <LetterAvatar>
                        {user.userName.charAt(0).toUpperCase()}
                      </LetterAvatar>
                    )}
                  </Avatar>
                  <UserContactInfo>
                    <h5>{user.userName}</h5>
                  </UserContactInfo>
                  {user.id !== currentUserId && (
                    <SendMessageBtn
                      onClick={() =>
                        handleCreatePrivateChat(
                          user.id,
                          user.userName,
                          user.userEmail
                        )
                      }
                    >
                      <FaRegMessage />
                    </SendMessageBtn>
                  )}
                </Item>
              ))}
          </UsersList>
        </UsersBoxStyled>
      </BoxStyled>
    </Modal>
  );
};

export default AllUsersModal;
