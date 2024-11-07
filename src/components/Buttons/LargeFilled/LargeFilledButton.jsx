import { LargeFilledButtonStyled } from '@/components/Buttons/LargeFilled/LargeFilledButtonStyled';

const LargeFilledButton = ({ text, handleClick }) => (
  <LargeFilledButtonStyled onClick={handleClick}>
    {text}
  </LargeFilledButtonStyled>
);

export default LargeFilledButton;
