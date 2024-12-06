import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { register } from '@/redux-store/auth/authOperations';
import { persistor } from '@/redux-store/store';
import InputField from '@/components/InputField/InputField';
import ButtonGoogle from '@/components/Buttons/GoogleButton/GoogleButton';
import ButtonFacebook from '@/components/Buttons/FaceBook/FaceBookButton';
import { routesPath } from '@/routes/routesConfig';
import { formFields, schema } from '@/routes/RegisterRoute/ValidationSchema';
import {
  RegisterFormBackground,
  RegisterFormContainer,
  SignInFormStyles,
  SignInTitle,
  SignInText,
  LoginLink,
  SignUpBtn,
  Separator,
  ButtonBlock,
} from '@/routes/RegisterRoute/RegisterRouteStyled';

const initialValues = {};
Object.keys(formFields).forEach(key => {
  initialValues[key] = '';
});

const RegisterRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = () => {
    navigate(routesPath.LOGIN);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(register(values));
        await persistor.flush();

        resetForm();
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
  });
  return (
    <RegisterFormBackground>
      <RegisterFormContainer>
        <SignInFormStyles onSubmit={formik.handleSubmit} autoComplete="off">
          <SignInTitle>Create account</SignInTitle>
          <SignInText>
            Already have an account?{' '}
            <LoginLink onClick={redirect}>Log in</LoginLink>
          </SignInText>
          {Object.entries(formFields).map(([key, value]) => (
            <InputField
              key={key}
              props={value}
              formik={formik}
              name={value.general}
            />
          ))}
          <SignUpBtn type="submit">Create</SignUpBtn>
          <Separator />
          <ButtonBlock>
            <ButtonGoogle type="button" />
            <ButtonFacebook type="button" />
          </ButtonBlock>
        </SignInFormStyles>
      </RegisterFormContainer>
    </RegisterFormBackground>
  );
};

export default RegisterRoute;
