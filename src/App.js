import { Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import MainPage from 'pages/MainPage/MainPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import AccountPage from 'pages/AccountPage/AccountPage';
import ChatPage from 'pages/ChatPage/ChatPage';
import Layout from 'components/Layout/Layout';
import Page404 from 'pages/Page404/Page404';
import Loader from './components/Loader/Loader';
// import VerificationPage from 'pages/VerificationPage/VerificationPage'
import PrivateRoute from 'PrivateRoute';
import RestrictedRoute from 'RestrictedRoute';

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo={`/app`} component={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo={`/app`}
                component={<RegisterPage />}
              />
            }
          />
          {/* <Route path="/register/:token" element={<VerificationPage />} />; */}
          <Route
            path="/app"
            element={
              <PrivateRoute redirectTo="/login" component={<Layout />} />
            }
          >
            <Route index element={<Navigate to="./chat" />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
