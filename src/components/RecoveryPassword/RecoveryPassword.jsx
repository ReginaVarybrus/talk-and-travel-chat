import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import InputField from '@/components/InputField/InputField';
import Modal from '@mui/material/Modal';
import { IoCloseOutline } from 'react-icons/io5';
import { axiosClient } from '@/services/api';
import URLs from '@/constants/constants';
import { SignUpBtn } from '@/routes/RegisterRoute/RegisterRouteStyled';
import { BoxStyled, CloseBtn, Subtitle, Title } from './RecoveryPasswordStyled';

const RecoveryPassword = ({ isOpen, onClose }) => {
  const sendRecoveryEmail = async email => {
    try {
      const response = await axiosClient.post(URLs.passwordRecovery, {
        userEmail: email,
      });
      if (response.status === 202) {
        Swal.fire({
          title: 'Check your email',
          text: 'We have sent you a recovery link. Please check your inbox',
          icon: 'info',
          showConfirmButton: false,
          timer: 2000,
        });
        onClose();
      }
    } catch (error) {
      console.error('Mock error:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to send recovery email. Please try again.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required'),
    }),
    onSubmit: async values => {
      sendRecoveryEmail(values.email);
    },
  });
  return (
    <Modal
      aria-labelledby="country-info-title"
      aria-describedby="country-info-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
    >
      <BoxStyled>
        <CloseBtn onClick={onClose}>
          <IoCloseOutline />
        </CloseBtn>
        <Title>Forgot your password?</Title>
        <Subtitle>
          Enter your email to receive an email to reset your password
        </Subtitle>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            props={{
              general: 'email',
              type: 'email',
              label: 'Email',
              placeholder: 'Enter your email',
            }}
            formik={formik}
          />
          <SignUpBtn type="submit">Send</SignUpBtn>
        </form>
      </BoxStyled>
    </Modal>
  );
};

export default RecoveryPassword;
