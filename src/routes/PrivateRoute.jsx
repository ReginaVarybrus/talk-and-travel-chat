import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '@/redux-store/selectors';
import { routesPath } from '@/routes/routesConfig';

export default function PrivateRoute({
  component: Component,
  redirectTo = routesPath.MAIN,
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  if (!isLoggedIn) {
    console.log(
      'PrivateRoute redirect triggered because login status is ',
      isLoggedIn
    );
  }

  return !isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
}

/* import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '@/redux-store/selectors';
import { routesPath } from '@/routes/routesConfig';
import { useEffect, useState } from 'react';

export default function PrivateRoute({
  component: Component,
  redirectTo = routesPath.MAIN,
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const [shouldRedirect, setShouldRedirect] = useState(false); // State to control redirection

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('PrivateRoute redirect triggered, waiting 3 seconds...');
      const timeoutId = setTimeout(() => {
        setShouldRedirect(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn]);

  if (shouldRedirect) {
    return <Navigate to={redirectTo} />;
  }

  // Otherwise, render the component (if logged in) or show a loading state
  return isLoggedIn ? <Component /> : <div>Redirecting in 3 seconds...</div>;
}
  */
