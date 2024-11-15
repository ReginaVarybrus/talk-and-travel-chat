import { LargeOutlinedButtonStyled } from '@/components/Buttons/LargeOutlined/LargeOutlinedButtonStyled';

const LargeOutlinedButton = ({
  text,
  handleClick,
  $mobilestyles,
  $desktopstyles,
}) => (
  <LargeOutlinedButtonStyled
    onClick={handleClick}
    $mobilestyles={$mobilestyles}
    $desktopstyles={$desktopstyles}
  >
    {text}
  </LargeOutlinedButtonStyled>
);

export default LargeOutlinedButton;
