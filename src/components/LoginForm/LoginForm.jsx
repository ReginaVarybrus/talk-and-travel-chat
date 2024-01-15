import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  ItemWrapp,
  StyledLabel,
  StyledInput,
  ValidationIcon,
  Error,
  Success,
  LogInBtn,
} from './LoginFormStyled';
// import LogIn from '../../images/icons/logIn.png';
// import ErrorImg from '../../images/icons/error.png';
// import SuccessImg from '../../images/icons/Done.png';
import { logIn } from 'redux-store/AuthOperations/AuthOperations';
import { useDispatch } from 'react-redux';

let schema = yup.object().shape({
  userEmail: yup
    .string()
    .transform(value => (value ? value.trim() : ''))
    .min(6)
    .max(25)
    .email()
    .matches(
      /^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/,
      'Invalid email address'
    )
    .required('The field is empty'),
  password: yup
    .string()
    .min(8)
    .max(30)
    .required('The field is empty'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      password: '',
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      dispatch(logIn(values));

      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <ItemWrapp>
        <StyledLabel
          color={{ error: formik.errors.userEmail, touched: formik.touched.userEmail }}
          htmlFor="email"
        >
          Email
        </StyledLabel>
        <StyledInput
          id="userEmail"
          name="userEmail"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.userEmail}
          placeholder="Enter email"
          color={{ error: formik.errors.userEmail, touched: formik.touched.userEmail }}
        />

        {formik.errors.userEmail ? (
          <Error>{formik.errors.userEmail}</Error>
        ) : !formik.errors.userEmail && formik.touched.userEmail ? (
          <Success>Field is not empty</Success>
        ) : null}

        {formik.errors.userEmail ? (
          <ValidationIcon
            // src={ErrorImg}
            alt="error"
          />
        ) : !formik.errors.userEmail && formik.touched.userEmail ? (
          <ValidationIcon
            // src={SuccessImg}
            alt="Success"
          />
        ) : null}
      </ItemWrapp>

      <ItemWrapp>
        <StyledLabel
          color={{
            error: formik.errors.password,
            touched: formik.touched.password,
          }}
          htmlFor="password"
        >
          Password
        </StyledLabel>
        <StyledInput
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Enter password"
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

        {formik.errors.password ? (
          <ValidationIcon
            // src={ErrorImg}
            alt="error"
          />
        ) : !formik.errors.password && formik.touched.password ? (
          <ValidationIcon
            // src={SuccessImg}
            alt="Success"
          />
        ) : null}
      </ItemWrapp>

      <LogInBtn type="submit">
        Log In
        {/* <img
          style={{ marginLeft: 11 }}
          // src={LogIn}
          alt="logIn"
        /> */}
      </LogInBtn>
    </form>
  );
};

export default LoginForm;
