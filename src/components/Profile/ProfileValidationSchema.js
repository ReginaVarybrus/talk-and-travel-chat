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
});

export const formFields = {
    userName: {
        general: 'userName',
        type: 'text',
        placeholder: 'Name',
    },
    userEmail: {
        general: 'userEmail',
        type: 'email',
        placeholder: 'E-mail',
    },
    about: {
        general: 'about',
        type: 'text',
        placeholder: 'About',
    },
};