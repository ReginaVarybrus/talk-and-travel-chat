import { BubbleStyled } from '@/components/Buttons/Bubble/BubbleStyled';
import SmallStar from '@/images/iconComponents/SmallStar';

const Bubble = props => {
  const { $text, $marginbottom, $desktopstyles } = props;
  return (
    <BubbleStyled $desktopstyles={$desktopstyles} $marginbottom={$marginbottom}>
      <SmallStar fillColor="var(--color-brand-blue)" width="27" height="27" />
      {$text}
    </BubbleStyled>
  );
};

export default Bubble;
