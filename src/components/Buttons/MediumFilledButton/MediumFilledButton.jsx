import { MediumFilledButtonStyled } from '@/components/Buttons/MediumFilledButton/MediumFilledButtonStyled';

const MediumFilledButton = ({
  type,
  text,
  handleClick,
  $mobilestyles,
  $desktopstyles,
}) => (
  <MediumFilledButtonStyled
    type={type}
    onClick={handleClick}
    $mobilestyles={$mobilestyles}
    $desktopstyles={$desktopstyles}
  >
    {text}
  </MediumFilledButtonStyled>
);

export default MediumFilledButton;
