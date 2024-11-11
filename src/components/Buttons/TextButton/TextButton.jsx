import { TextButtonStyled } from '@/components/Buttons/TextButton/TextButtonStyled';

const TextButton = ({
  $desktopstyles,
  $mobilestyles,
  htmlFor,
  text,
  handleClick,
}) => (
  <TextButtonStyled
    $desktopstyles={$desktopstyles}
    $mobilestyles={$mobilestyles}
    htmlFor={htmlFor}
    onClick={handleClick}
  >
    {text}
  </TextButtonStyled>
);

export default TextButton;
