import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

import InputField from '@/components/InputField/InputField';
import { axiosClient } from '@/services/api';
import { routesPath } from '@/routes/routesConfig';
import {
  ResetPasswordBackground,
  ResetPasswordContainer,
  SubtitleResetPage,
  TitleResetPage,
} from './RecoveryPasswordStyled';
import { SignUpBtn } from '../RegisterForm/RegisterForm.styled';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { password: '', repeatPassword: '' },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'At least 8 characters & 1 number')
        .max(30, 'Too long')
        .matches(
          /(?=.*[a-z])/,
          'Password must contain at least 1 lowercase letter'
        )
        .matches(/(?=.*[0-9])/, 'Password must contain at least 1 number')
        .required('The field is empty'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async values => {
      try {
        console.log(`Mock: token ${token}`);
        // await axiosClient.put(`/user/password/${token}`, {
        //   password: values.password,
        // });
        swal('Password successfully reset!', '', 'success');
        navigate(routesPath.LOGIN);
      } catch (error) {
        console.error('Error resetting password:', error);
        swal('Failed to reset password. Please try again.', '', 'error');
      }
    },
  });
  return (
    <ResetPasswordBackground>
      <ResetPasswordContainer>
        <TitleResetPage>Reset password</TitleResetPage>
        <SubtitleResetPage>Please enter a new password</SubtitleResetPage>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            props={{
              general: 'password',
              type: 'password',
              placeholder: 'New password',
            }}
            formik={formik}
          />
          <InputField
            props={{
              general: 'repeatPassword',
              type: 'password',
              placeholder: 'Password again',
            }}
            formik={formik}
          />
          <SignUpBtn type="submit" style={{ marginTop: '32px' }}>
            Change password
          </SignUpBtn>
        </form>
      </ResetPasswordContainer>
    </ResetPasswordBackground>
  );
};

export default ResetPassword;
