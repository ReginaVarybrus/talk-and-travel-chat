import { MediumFilledButtonStyled } from '@/components/Buttons/MediumFilledButton/MediumFilledButtonStyled';

const MediumFilledButton = ({ type, text, handleClick }) => (
  <MediumFilledButtonStyled type={type} onClick={handleClick}>
    {text}
  </MediumFilledButtonStyled>
);

export default MediumFilledButton;
