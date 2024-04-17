import { useState, useEffect } from 'react';
import NavBar from '@/components/NavigationBar/NavBar';

const Header = () => {
  const [isvisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return <NavBar isvisible={isvisible} type="header" />;
};

export default Header;
