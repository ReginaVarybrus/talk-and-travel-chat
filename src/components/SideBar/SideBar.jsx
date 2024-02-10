import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Wrapper, ProfileBox, LogOutBox, Frame } from './SideBarStyled';

import { getUserName } from '../../redux-store/AuthOperations/selectors';
import { logOut } from '../../redux-store/AuthOperations/AuthOperations';
// import Icons from '../Icons/Icons';
import SideBarItem from '../SideBarItem/SideBarItem';

const SideBar = ({ onClickDms, onClickRooms, isActive }) => {
  const userName = useSelector(getUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;

  const handleProfileOpen = () => {
    navigate('account');
  };

  const handleLogOut = async (event, values) => {
    try {
      await dispatch(logOut(values));
      navigate('/');
      console.log('Logout successful', event);
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <Wrapper>
      <ProfileBox>
        <SideBarItem
          onClick={handleProfileOpen}
          isActive={currentPage === '/app/account'}
          alt="Photo icon"
          name="photo-icon"
          size="24"
        >
          {userName}
        </SideBarItem>
      </ProfileBox>
      <Frame>
        <SideBarItem
          onClick={onClickRooms}
          isActive={isActive === 'component2'}
          alt="Rooms icon"
          name="rooms"
          size="24"
        >
          Rooms
        </SideBarItem>
        <SideBarItem
          onClick={onClickDms}
          isActive={isActive === 'component1'}
          alt="DMs icon"
          name="dms"
          size="24"
        >
          DMs
        </SideBarItem>
      </Frame>
      <LogOutBox>
        <SideBarItem
          onClick={handleLogOut}
          alt="Logout icon"
          name="logout"
          size="24"
        >
          LogOut
        </SideBarItem>
      </LogOutBox>
    </Wrapper>
  );
};

SideBar.propTypes = {
  onClickDms: PropTypes.func,
  onClickRooms: PropTypes.func,
  isActive: PropTypes.string,
};

export default SideBar;
