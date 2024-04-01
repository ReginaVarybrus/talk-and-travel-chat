import { useFormik } from 'formik';
import { register } from '@/redux-store/AuthOperations/AuthOperations';
import { useDispatch } from 'react-redux';
import {
  Background,
  RegisterFormContainer,
  SignInFormStyles,
  SignInTitle,
  SignInText,
  LoginLink,
  SignUpBtn,
  Separator,
  ButtonBlock,
  ButtonGoogle,
  ButtonFacebook,
} from '@/components/RegisterForm/RegisterForm.styled';
import InputField from '@/components/InputField/InputField';
import { formFields, schema } from '@/components/RegisterForm/ValidationSchema';

const initialValues = {};
Object.keys(formFields).forEach(key => {
  initialValues[key] = '';
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      dispatch(register(values));
      resetForm();
    },
  });

  return (
    <Background>
      <RegisterFormContainer>
        <SignInFormStyles onSubmit={formik.handleSubmit} autoComplete="off">
          <SignInTitle>Create account</SignInTitle>
          <SignInText>
            Already have an account? <LoginLink>Log in</LoginLink>
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
    </Background>
  );
};

export default RegisterForm;
