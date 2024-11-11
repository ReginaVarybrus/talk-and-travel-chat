import { LargeFilledButtonStyled } from '@/components/Buttons/LargeFilled/LargeFilledButtonStyled';

const LargeFilledButton = ({
  text,
  handleClick,
  $mobilestyles,
  $desktopstyles,
}) => (
  <LargeFilledButtonStyled
    onClick={handleClick}
    $mobilestyles={$mobilestyles}
    $desktopstyles={$desktopstyles}
  >
    {text}
  </LargeFilledButtonStyled>
);

export default LargeFilledButton;
