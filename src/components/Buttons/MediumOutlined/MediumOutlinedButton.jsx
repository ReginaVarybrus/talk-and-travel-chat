import { MediumOutlinedButtonStyled } from '@/components/Buttons/MediumOutlined/MediumOutlinedButtonStyled';

const MediumOutlinedButton = ({
  type,
  text,
  handleClick,
  $mobilestyles,
  $desktopstyles,
}) => (
  <MediumOutlinedButtonStyled
    type={type}
    onClick={handleClick}
    $mobilestyles={$mobilestyles}
    $desktopstyles={$desktopstyles}
  >
    {text}
  </MediumOutlinedButtonStyled>
);

export default MediumOutlinedButton;
