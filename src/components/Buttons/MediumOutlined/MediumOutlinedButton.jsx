import { MediumOutlinedButtonStyled } from '@/components/Buttons/MediumOutlined/MediumOutlinedButtonStyled';

const MediumOutlinedButton = ({
  text,
  handleClick,
  $mobilestyles,
  $desktopstyles,
}) => (
  <MediumOutlinedButtonStyled
    onClick={handleClick}
    $mobilestyles={$mobilestyles}
    $desktopstyles={$desktopstyles}
  >
    {text}
  </MediumOutlinedButtonStyled>
);

export default MediumOutlinedButton;
