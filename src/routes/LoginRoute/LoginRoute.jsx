import { useState } from 'react';
import { logIn } from '@/redux-store/auth/authOperations';
import { persistor } from '@/redux-store/store';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { formFields, schema } from '@/routes/LoginRoute/LoginValidationSchema';
import { routesPath } from '@/routes/routesConfig';
import ButtonGoogle from '@/components/Buttons/GoogleButton/GoogleButton';
import ButtonFacebook from '@/components/Buttons/FaceBook/FaceBookButton';
import RecoveryPassword from '@/components/RecoveryPassword/RecoveryPassword';
import InputField from '@/components/InputField/InputField';

import {
  ButtonBlock,
  RegisterFormBackground as LoginFormBackground,
  RegisterFormContainer as LoginFormContainer,
  SignInFormStyles as LoginFormStyles,
  SignInTitle as LoginTitle,
  SignInText as LoginText,
  LoginLink as SignUpLink,
  SignUpBtn as LogInBtn,
  Separator,
  TextForgotPassword,
} from '@/routes/RegisterRoute/RegisterRouteStyled';

const initialValues = {};
Object.keys(formFields).forEach(key => {
  initialValues[key] = '';
});

const LoginRoute = () => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = () => {
    navigate(routesPath.REGISTER);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(logIn(values)).unwrap();
        await persistor.flush();
        navigate(routesPath.ROOMS);

        resetForm();
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  });

  return (
    <>
      <LoginFormBackground>
        <LoginFormContainer>
          <LoginFormStyles onSubmit={formik.handleSubmit} autoComplete="off">
            <LoginTitle>Welcome back</LoginTitle>
            <LoginText>
              Don`t have an account yet?{' '}
              <SignUpLink onClick={redirect}>Sign up</SignUpLink>
            </LoginText>
            {Object.entries(formFields).map(([key, value]) => (
              <InputField
                key={key}
                props={value}
                formik={formik}
                name={value.general}
              />
            ))}
            <LogInBtn type="submit">Log In</LogInBtn>
            <Separator />
            <ButtonBlock>
              <ButtonGoogle type="button" />
              <ButtonFacebook type="button" />
            </ButtonBlock>
          </LoginFormStyles>
          <TextForgotPassword onClick={handleOpen}>
            Forgot your password?
          </TextForgotPassword>
        </LoginFormContainer>
      </LoginFormBackground>
      <RecoveryPassword isOpen={openModal} onClose={handleClose} />
    </>
  );
};

export default LoginRoute;
