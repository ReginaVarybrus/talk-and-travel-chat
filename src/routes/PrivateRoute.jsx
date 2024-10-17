import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '@/redux-store/selectors';
import { routesPath } from '@/routes/routesConfig';

export default function PrivateRoute({
  component: Component,
  redirectTo = routesPath.MAIN,
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return !isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
}
