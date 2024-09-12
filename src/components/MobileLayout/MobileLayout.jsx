import { Outlet } from 'react-router-dom';
import { MobileLayoutStyled } from './MobileLayoutStyled';
import TapBar from '../TapBar/TapBar';

const MobileLayout = () => (
  <MobileLayoutStyled>
    <Outlet />
    <TapBar />
  </MobileLayoutStyled>
);

export default MobileLayout;
