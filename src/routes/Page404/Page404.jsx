import React from 'react';
import { useRouteError } from 'react-router';

export default function Page404() {
  const error = useRouteError();

  return <div>Page404</div>;
}
