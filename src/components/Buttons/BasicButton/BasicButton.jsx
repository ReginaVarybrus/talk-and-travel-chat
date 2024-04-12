import { BasicButtonLayout } from '@/components/Buttons/BasicButton/BasicButtonStyled';

const BasicButton = props => {
  const { color, text, handleClick } = props;

  return (
    <BasicButtonLayout onClick={handleClick} color={color}>
      {text}
    </BasicButtonLayout>
  );
};

export default BasicButton;
