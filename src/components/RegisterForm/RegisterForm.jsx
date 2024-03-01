import { useFormik } from 'formik';
import * as yup from 'yup';
import { register } from '@/redux-store/AuthOperations/AuthOperations';
import { useDispatch } from 'react-redux';
import {
  Background,
  RegisterFormContainer,
  SignInFormStyles,
  SignInTitle,
  SignInText,
  LoginLink,
  ItemWrapp,
  StyledLabel,
  Error,
  Success,
  // ValidationIcon,
  StyledInput,
  SignUpBtn,
  Separator,
  ButtonBlock,
  ButtonGoogle,
  ButtonFacebook,
} from './RegisterForm.styled';

const schema = yup.object().shape({
  userName: yup
    .string()
    .transform(value => (value ? value.trim() : ''))
    .min(2, 'Name must be more then 1 symbol')
    .max(30, 'To long')
    .matches(/^[a-zA-Z0-9 ]{2,30}$/, 'Invalid name')
    .required('The field is empty'),
  userEmail: yup
    .string()
    .transform(value => (value ? value.trim() : ''))

    .email()
    .matches(
      /^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/,
      'Invalid email address'
    )
    .required('The field is empty'),
  password: yup
    .string()
    .min(
      8,
      'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
    )
    .max(30, 'To long')
    .matches(
      /(?=.*[a-z])/,
      'password must contain at least 1 lower case letter'
    )
    .matches(
      /(?=.*[A-Z])/,
      'password must contain at least 1 upper case letter'
    )
    .matches(/(?=.*[0-9])/, 'password must contain at least 1 number')
    .matches(
      /(?=.*[!@#$%^&*])/,
      'password must contain at least 1 special character'
    )
    .required('The field is empty'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: '',
      userEmail: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      if (values.password !== values.repeatPassword) {
        // Set error for repeatPassword field
        formik.setFieldError('repeatPassword', 'Passwords do not match');
        return; // Stop submission if passwords don't match
      }
      dispatch(register(values));

      localStorage.setItem(
        'verify',
        JSON.stringify({ userEmail: values.email, password: values.password })
      );

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
          <ItemWrapp>
            <StyledLabel
              color={{
                error: formik.errors.userEmail,
                touched: formik.touched.userEmail,
              }}
              htmlFor="email"
            />
            <StyledInput
              id="userEmail"
              name="userEmail"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.userEmail}
              placeholder="E-mail"
              color={{
                error: formik.errors.userEmail,
                touched: formik.touched.userEmail,
              }}
            />

            {formik.errors.userEmail ? (
              <Error>{formik.errors.userEmail}</Error>
            ) : !formik.errors.userEmail && formik.touched.userEmail ? (
              <Success>Field is not empty</Success>
            ) : null}
          </ItemWrapp>
          <ItemWrapp>
            <StyledLabel
              color={{
                error: formik.errors.userName,
                touched: formik.touched.userName,
              }}
              htmlFor="Name"
            />
            <StyledInput
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.userName}
              placeholder="Username"
              color={{
                error: formik.errors.userName,
                touched: formik.touched.userName,
              }}
            />
            {formik.errors.userName ? (
              <Error>{formik.errors.userName}</Error>
            ) : !formik.errors.userName && formik.touched.userName ? (
              <Success>Field is not empty</Success>
            ) : null}
          </ItemWrapp>
          <ItemWrapp>
            <StyledLabel
              color={{
                error: formik.errors.password,
                touched: formik.touched.password,
              }}
              htmlFor="password"
            />
            <StyledInput
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              color={{
                error: formik.errors.password,
                touched: formik.touched.password,
              }}
              style={{ marginBottom: 32 }}
            />

            {formik.errors.password && formik.touched.password ? (
              <Error>{formik.errors.password}</Error>
            ) : !formik.errors.password && formik.touched.password ? (
              <Success>Field is not empty</Success>
            ) : null}
          </ItemWrapp>
          <ItemWrapp>
            <StyledLabel
              color={{
                error: formik.errors.repeatPassword,
                touched: formik.touched.repeatPassword,
              }}
              htmlFor="repeatPassword"
            />
            <StyledInput
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.repeatPassword}
              placeholder="Password again"
              color={{
                error: formik.errors.repeatPassword,
                touched: formik.touched.repeatPassword,
              }}
              style={{ marginBottom: 32 }}
            />
            {formik.errors.repeatPassword && formik.touched.repeatPassword && (
              <Error>{formik.errors.repeatPassword}</Error>
            )}
          </ItemWrapp>
          <SignUpBtn type="submit">Create</SignUpBtn>
          <Separator data-content="or" />
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
