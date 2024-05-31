import NavBar from '@/components/NavigationBar/NavBar';
import useNavBarVisibility from '@/components/NavigationBar/useNavBarVisibility';

const Header = () => {
  const isVisible = useNavBarVisibility();

  return <NavBar isvisible={isVisible} $navBarType="header" />;
};

export default Header;
