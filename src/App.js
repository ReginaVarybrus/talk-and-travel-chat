
// import './App.css';
import { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

import MainPage from 'pages/MainPage/MainPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import AccountPage from 'pages/AccountPage/AccountPage';
import ChatPage from 'pages/ChatPage/ChatPage'
import Layout from 'components/Layout/Layout';
// import Page404 from 'page/Page404/Page404';
import Loader from './components/Loader/Loader';
// import VerificationPage from 'pages/VerificationPage/VerificationPage'
import PrivateRoute from 'PrivateRoute';
import RestrictedRoute from 'RestrictedRoute';

export default function App() {
 
  return (
    <>
    <Suspense fallback={<Loader />}>
    <Routes>

    <Route path="/" element={<Layout />}>
    <Route index element={
              <RestrictedRoute
                redirectTo={`/chat`}
                component={<MainPage />}
              />
            }
          />
      <Route path="/"
            element={
              <RestrictedRoute
                redirectTo={`/chat`} component={<MainPage />}
              />
            }
          />
       <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo={`/chat`} component={<LoginPage />}
              />
            }
          />
       <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo={`/chat`} component={<RegisterPage />}
              />
            }
          />
       {/* <Route path="/register/:token" element={<VerificationPage />} />; */}
       <Route
            path="/"
            element={
              <PrivateRoute redirectTo="/login" component={<Layout />} />
            }
          ></Route>


      <Route path='/account' element={<AccountPage/>}/>
      <Route path='/chat' element={<ChatPage/>}/>
      {/* <Route path="*" element={<Page404/>} /> */}
      </Route>

    </Routes>
    </Suspense>
    </>
  );
}




