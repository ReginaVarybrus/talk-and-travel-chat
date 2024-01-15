import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Wrapper,
  ProfileBox,
  LogOutBox,
  Frame,
  // ProfileBoxAvatar,
  // LogOutButton,
} from './SideBarStyled';

import { getUserName } from 'redux-store/AuthOperations/selectors';
import { logOut } from 'redux-store/AuthOperations/AuthOperations';
// import Icons from '../Icons/Icons';
import SideBarItem from '../SideBarItem/SideBarItem';

function SideBar({ onClickDms, onClickRooms, isActive }) {
  const userName = useSelector(getUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileOpen = () => {
    navigate('/account');
    console.log('clicked profile');
  };

  const handleLogOut = (event, values) => {
    dispatch(logOut(values));
    navigate('/');
    console.log('clicked logout', event);
  };

  return (
    <Wrapper>
      <ProfileBox>
        {/* <ProfileBoxAvatar
          onClick={handleProfileOpen}
          src=""
          alt="Profile Avatar"
        >
          <Icons name='photo-icon' color='#222222' size='24' />
        </ProfileBoxAvatar>
        <Text>Anton</Text> */}
        <SideBarItem
          onClick={handleProfileOpen}
          alt="Photo icon"
          name="photo-icon"
          fill="var(--color-dark)"
          size="24"
        >
          {userName}
        </SideBarItem>
      </ProfileBox>
      <Frame>
        <SideBarItem
          onClick={onClickDms}
          isActive={isActive === 'component1'}
          alt="DMs icon"
          name="dms"
          fill="var(--color-dark)"
          size="24"
        >
          DMs
        </SideBarItem>
        <SideBarItem
          onClick={onClickRooms}
          isActive={isActive === 'component2'}
          alt="Rooms icon"
          name="rooms"
          fill="var(--color-dark)"
          size="24"
        >
          Rooms
        </SideBarItem>
      </Frame>
      <LogOutBox>
        <SideBarItem
          onClick={handleLogOut}
          alt="Logout icon"
          name="logout"
          fill="var(--color-dark)"
          size="24"
        >
          LogOut
        </SideBarItem>
        {/* <LogOutButton onClick={handleLogOut}></LogOutButton>
        <Text>LogOut</Text> */}
      </LogOutBox>
    </Wrapper>
  );
}

SideBar.propTypes = {
  onClickDms: PropTypes.func,
  onClickRooms: PropTypes.func
};

export default SideBar;
