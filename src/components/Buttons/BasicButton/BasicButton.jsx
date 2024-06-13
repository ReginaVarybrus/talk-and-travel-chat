import { BasicButtonLayout } from '@/components/Buttons/BasicButton/BasicButtonStyled';

const BasicButton = ({ text, handleClick, variant, sx }) => (
  <BasicButtonLayout sx={sx} onClick={handleClick} variant={variant}>
    {text}
  </BasicButtonLayout>
);

export default BasicButton;
