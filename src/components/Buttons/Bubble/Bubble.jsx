import { BubbleStyled } from '@/components/Buttons/Bubble/BubbleStyled';

const Bubble = props => {
  const { text, ...position } = props;
  return <BubbleStyled position={position}>{text}</BubbleStyled>;
};

export default Bubble;
