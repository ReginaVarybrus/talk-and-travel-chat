import { useNavigate } from 'react-router-dom';

import {
  StyledSmallLogo,
  NavBarLayout,
  AnchorLink,
  MainPageNavRight,
  MainPageNavLeft,
} from '@/components/NavigationBar/NavBarStyled';
import { routesPath } from '@/routes/routesConfig';
import SmallLogo from '@/images/iconComponents/SmallLogo';
import LargeFilledButton from '../Buttons/LargeFilled/LargeFilledButton';
import LargeOutlinedButton from '../Buttons/LargeOutlined/LargeOutlinedButton';

const NavBar = props => {
  const { $navBarType, isvisible } = props;

  const navigate = useNavigate();

  const handleRegisterOpen = () => {
    navigate(routesPath.REGISTER);
  };

  const handleLoginOpen = () => {
    navigate(routesPath.LOGIN);
  };

  return (
    <NavBarLayout $navBarType={$navBarType} $isvisible={isvisible}>
      <MainPageNavLeft>
        <StyledSmallLogo>
          <SmallLogo
            width="48px"
            height="48px"
            fillColor="var(--color-brand-blue)"
          />
        </StyledSmallLogo>
        <AnchorLink href="#about">About chat</AnchorLink>
        <AnchorLink href="#benefits">Benefits</AnchorLink>
      </MainPageNavLeft>
      <MainPageNavRight>
        <LargeOutlinedButton
          $mobilestyles="
          margin-right: 10px;
          line-height: 16px;
          font-size: 12px;"
          $desktopstyles="
          font-size: 16px;
          margin-right: 24px;"
          text="Log In"
          handleClick={handleLoginOpen}
        />
        <LargeFilledButton
          $mobilestyles="
          line-height: 16px;
          font-size: 12px;"
          $desktopstyles="
          font-size: 16px;"
          text="Get started — it’s free"
          handleClick={handleRegisterOpen}
        />
      </MainPageNavRight>
    </NavBarLayout>
  );
};

export default NavBar;
