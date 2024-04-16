import { BubbleStyled } from '@/components/Buttons/Bubble/BubbleStyled';

const Bubble = props => {
  const { text } = props;
  return <BubbleStyled>{text}</BubbleStyled>;
};

export default Bubble;
