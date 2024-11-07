import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '@/components/InputField/InputField';
import Modal from '@mui/material/Modal';
import { IoCloseOutline } from 'react-icons/io5';
import swal from 'sweetalert';
import { axiosClient } from '@/services/api';
import axios from 'axios';
import URLs from '@/constants/constants';
import { BoxStyled, CloseBtn, Subtitle, Title } from './RecoveryPasswordStyled';
import { SignUpBtn } from '../RegisterForm/RegisterForm.styled';

const RecoveryPassword = ({ isOpen, onClose }) => {
  const sendRecoveryEmail = async email => {
    try {
      console.log(`Mock: sending recovery email to ${email}`);
      swal(
        'Check your email',
        'We have sent you a recovery link. Please check your inbox',
        'info'
      );
      onClose();
    } catch (error) {
      console.error('Mock error:', error);
      swal(
        'Error',
        'Failed to send recovery email. Please try again.',
        'error'
      );
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
