import { TextButtonStyled } from '@/components/Buttons/TextButton/TextButtonStyled';

const TextButton = ({ htmlFor, text, handleClick }) => (
  <TextButtonStyled htmlFor={htmlFor} onClick={handleClick}>
    {text}
  </TextButtonStyled>
);

export default TextButton;
