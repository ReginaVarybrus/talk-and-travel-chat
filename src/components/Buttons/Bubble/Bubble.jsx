import { BubbleStyled } from '@/components/Buttons/Bubble/BubbleStyled';

const Bubble = props => {
  const { text, ...position } = props;
  return (
    <BubbleStyled left={position.left} marginbottom={position.marginbottom}>
      {text}
    </BubbleStyled>
  );
};

export default Bubble;
