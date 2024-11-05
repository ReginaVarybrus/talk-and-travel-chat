import { LargeOutlinedWIconButtonStyled } from '@/components/Buttons/LargeOutlinedWIcon/LargeOutlinedWIconButtonStyled';

const LargeOutlinedWIconButton = ({ text, handleClick }) => (
  <LargeOutlinedWIconButtonStyled onClick={handleClick}>
    {text}
  </LargeOutlinedWIconButtonStyled>
);

export default LargeOutlinedWIconButton;
