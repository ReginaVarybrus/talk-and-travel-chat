import { BubbleStyled } from '@/components/Buttons/Bubble/BubbleStyled';
import SmallStar from '@/images/iconComponents/SmallStar';

const Bubble = props => {
  const { text, ...position } = props;
  return (
    <BubbleStyled $left={position.left} $marginbottom={position.marginbottom}>
      <SmallStar fillColor="var(--color-brand-blue)" width="32" height="32" />
      {text}
    </BubbleStyled>
  );
};

export default Bubble;
