import { BasicButtonLayout } from '@/components/Buttons/BasicButton/BasicButtonStyled';

const BasicButton = props => {
  const { text, handleClick, variant } = props;

  return (
    <BasicButtonLayout onClick={handleClick} variant={variant}>
      {text}
    </BasicButtonLayout>
  );
};

export default BasicButton;
