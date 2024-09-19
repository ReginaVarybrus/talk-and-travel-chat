import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MobileLayoutStyled } from './MobileLayoutStyled';
import TapBar from '../TapBar/TapBar';

const MobileLayout = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  return (
    <MobileLayoutStyled>
      <Outlet
        context={{
          isChatVisible,
          setIsChatVisible,
        }}
      />
      <TapBar isChatVisible={isChatVisible} />
    </MobileLayoutStyled>
  );
};

export default MobileLayout;
