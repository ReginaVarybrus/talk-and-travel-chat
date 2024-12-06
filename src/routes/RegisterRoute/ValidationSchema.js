import * as yup from 'yup';

export const schema = yup.object().shape({
  userName: yup
    .string()
    .test(
      'not-only-spaces',
      'User name cannot consist of spaces only.',
      value => value && value.trim() !== ''
    )
    .transform(value => (value ? value.trim() : ''))
    .min(2, 'Name must be between 2 and 16 characters.')
    .max(30, 'Name must be between 2 and 16 characters.')
    .matches(
      /^[a-zA-Z0-9 @#$%^&*!.,_-]{2,16}$/,
      'Name can contain latin letters, numbers and symbols.'
    )
    .required('User name must be between 2 and 16 characters.'),
  userEmail: yup
    .string()
    .transform(value => (value ? value.trim() : ''))
    .matches(
      /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.(?:[01]?\d\d?|2[0-4]\d|25[0-5])\]))$/,
      'Invalid email address format'
    )
    .required('The field is empty'),
  password: yup.string().min(8).max(30).required('Password must be between 8 and 30 characters.'),
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
