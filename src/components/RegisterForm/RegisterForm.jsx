import { useFormik } from 'formik';
import { register } from '@/redux-store/AuthOperations/AuthOperations';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { routesPath } from '@/routes/routesConfig';
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
} from '@/components/RegisterForm/RegisterForm.styled';
import ButtonFacebook from '@/components/Buttons/FaceBook/FaceBookButton';
import ButtonGoogle from '@/components/Buttons/GoogleButton/GoogleButton';
import InputField from '@/components/InputField/InputField';
import { formFields, schema } from '@/components/RegisterForm/ValidationSchema';

const initialValues = {};
Object.keys(formFields).forEach(key => {
  initialValues[key] = '';
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = () => {
    navigate(routesPath.LOGIN);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      dispatch(register(values));
      navigate(routesPath.CHAT);
      resetForm();
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

export default RegisterForm;
