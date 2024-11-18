import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ScrollButton } from './ScrollToBottonButonStyles';

const ScrollToBottomButton = ({ targetRef }) => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  const scrollToBottom = () => {
    if (targetRef.current) {
      targetRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (targetRef.current) {
      const { scrollTop, clientHeight } = targetRef.current;
      const hasScrolledUp = Math.abs(scrollTop) > clientHeight;

      setIsScrollButtonVisible(hasScrolledUp);
    }
  };

  useEffect(() => {
    const targetElement = targetRef.current;

    handleScroll();

    if (targetElement) {
      targetElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (targetElement) {
        targetElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [targetRef]);

  return (
    <ScrollButton $isVisible={isScrollButtonVisible} onClick={scrollToBottom}>
      <IoIosArrowDown />
    </ScrollButton>
  );
};

export default ScrollToBottomButton;
