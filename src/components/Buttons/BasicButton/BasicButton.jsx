import { BasicButtonLayout } from '@/components/Buttons/BasicButton/BasicButtonStyled';

const BasicButton = props => {
  const { text, handleClick, variant, sx } = props;

  return (
    <BasicButtonLayout sx={sx} onClick={handleClick} variant={variant}>
      {text}
    </BasicButtonLayout>
  );
};

export default BasicButton;
