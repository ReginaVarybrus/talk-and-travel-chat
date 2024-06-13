import { useState, useEffect } from 'react';

const useNavBarVisibility = () =>
{
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const currentScrollPos = window.scrollY;
            setIsVisible(prevScrollPos > currentScrollPos);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return isVisible;
};

export default useNavBarVisibility;
