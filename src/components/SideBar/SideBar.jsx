import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { routesPath } from '@/routes/routesConfig';
import { getUserName } from '@/redux-store/selectors';
import { logOut } from '@/redux-store/AuthOperations/AuthOperations';
import { Wrapper, ProfileBox, LogOutBox, Frame } from './SideBarStyled';
import SideBarItem from '../SideBarItem/SideBarItem';

const SideBar = ({ onClickDms, onClickRooms, isActive }) => {
  const userName = useSelector(getUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname;

  const handleProfileOpen = () => {
    navigate(routesPath.ACCOUNT);
  };

  const handleLogOut = (event, values) => {
    dispatch(logOut(values));
    navigate(routesPath.MAIN);
  };

  return (
    <Wrapper>
      <ProfileBox>
        <SideBarItem
          onClick={handleProfileOpen}
          isActive={currentPage === routesPath.ACCOUNT}
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
