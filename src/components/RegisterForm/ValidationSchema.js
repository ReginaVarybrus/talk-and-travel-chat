import * as yup from 'yup';

export const schema = yup.object().shape({
  userName: yup
    .string()
    .transform(value => (value ? value.trim() : ''))
    .min(2, 'Name must be more then 1 symbol')
    .max(30, 'Too long')
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
    .min(8, 'At least 8 characters & 1 number')
    .max(30, 'Too long')
    .matches(/(?=.*[a-z])/, 'Password must contain at least 1 lowercase letter')
    .matches(/(?=.*[0-9])/, 'Password must contain at least 1 number')
    .required('The field is empty'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const formFields = {
  userEmail: {
    general: 'userEmail',
    type: 'email',
    placeholder: 'E-mail',
  },
  userName: {
    general: 'userName',
    type: 'text',
    placeholder: 'User name',
  },
  password: {
    general: 'password',
    type: 'password',
    placeholder: 'Password',
  },
  repeatPassword: {
    general: 'repeatPassword',
    type: 'password',
    placeholder: 'Password again',
  },
};
