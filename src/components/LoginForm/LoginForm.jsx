import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { logIn } from '@/redux-store/AuthOperations/AuthOperations';
import { useDispatch } from 'react-redux';
import { routesPath } from '@/routes/routesConfig';

import {
  formFields,
  schema,
} from '@/components/LoginForm/LoginValidationSchema';
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
} from '@/components/RegisterForm/RegisterForm.styled';

import ButtonFacebook from '@/components/Buttons/FaceBook/FaceBookButton';
import ButtonGoogle from '@/components/Buttons/GoogleButton/GoogleButton';

const initialValues = {};
Object.keys(formFields).forEach(key => {
  initialValues[key] = '';
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = () => {
    navigate(routesPath.REGISTER);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      dispatch(logIn(values));
      navigate(routesPath.ROOMS);
      resetForm();
    },
  });

  return (
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
      </LoginFormContainer>
    </LoginFormBackground>
  );
};

export default LoginForm;
