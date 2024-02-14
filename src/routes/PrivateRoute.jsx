import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  getIsLoggedIn,
  getUserRefresh,
} from '@/redux-store/AuthOperations/selectors';
import { routesPath } from '@/routes/routesConfig';

export default function PrivateRoute({
  component: Component,
  redirectTo = routesPath.MAIN,
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefresh = useSelector(getUserRefresh);

  const shouldRedirect = !isLoggedIn && !isRefresh;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
}
