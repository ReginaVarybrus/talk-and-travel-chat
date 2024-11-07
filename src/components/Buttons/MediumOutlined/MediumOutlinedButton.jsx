import { MediumOutlinedButtonStyled } from '@/components/Buttons/MediumOutlined/MediumOutlinedButtonStyled';

const MediumOutlinedButton = ({ text, handleClick }) => (
  <MediumOutlinedButtonStyled onClick={handleClick}>
    {text}
  </MediumOutlinedButtonStyled>
);

export default MediumOutlinedButton;
