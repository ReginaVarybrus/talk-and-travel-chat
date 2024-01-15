import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getUserRefresh } from 'redux-store/AuthOperations/selectors';


export default function PrivateRoute({
  component: Component,
  redirectTo = '/',
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefresh = useSelector(getUserRefresh);

  const shouldRedirect = !isLoggedIn && !isRefresh;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
}