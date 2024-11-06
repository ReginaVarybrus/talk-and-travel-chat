import { LargeOutlinedButtonStyled } from '@/components/Buttons/LargeOutlined/LargeOutlinedButtonStyled';

const LargeOutlinedButton = ({ text, handleClick }) => (
  <LargeOutlinedButtonStyled onClick={handleClick}>
    {text}
  </LargeOutlinedButtonStyled>
);

export default LargeOutlinedButton;
