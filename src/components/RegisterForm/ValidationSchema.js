import * as yup from 'yup';

export const schema = yup.object().shape({
    userName: yup
        .string()
        .transform(value => (value ? value.trim() : ''))
        .min(2, 'name must be more then 1 symbol')
        .max(30, 'to long')
        .matches(/^[a-zA-Z0-9 ]{2,30}$/, 'invalid name')
        .required('the field is empty'),
    userEmail: yup
        .string()
        .transform(value => (value ? value.trim() : ''))

        .email()
        .matches(
            /^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/,
            'invalid email address'
        )
        .required('the field is empty'),
    password: yup
        .string()
        .min(
            8,
            'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
        )
        .max(30, 'to long')
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
        .required('the field is empty'),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'passwords must match')
        .required('confirm password is required'),
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