import React from 'react';
import { useRouteError } from 'react-router';

const Page404 = () => {
  const error = useRouteError();

  return <div>Page404</div>;
};

export default Page404;
