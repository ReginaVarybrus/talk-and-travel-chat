import styled from 'styled-components';
import Box from '@mui/material/Box';
import { SignUpBtn } from '@/components/RegisterForm/RegisterForm.styled';

export const ModalBoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  border-radius: 16px;
  background: var(--white-color);
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  h5 {
    margin-bottom: 32px;
  }
`;

export const Buttons = styled(Box)`
  display: flex;
`;

export const Button = styled(SignUpBtn)`
  margin: 0 10px;
`;
