import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import URLs from '@/constants/constants';
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
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

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
        const response = await axiosClient.patch(URLs.passwordRecovery, {
          token,
          newPassword: values.password,
        });
        if (response.status === 204) {
          Swal.fire({
            text: 'Password successfully reset',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });

          navigate(routesPath.LOGIN);
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        Swal.fire({
          text: 'Failed to reset password. Please try again.',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
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
