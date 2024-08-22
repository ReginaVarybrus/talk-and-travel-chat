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
    about: yup
        .string()
        .max(10, 'to long')
});

export const formFields = {
    userName: {
        general: 'userName',
        type: 'text',
        label: 'Name',
        placeholder: 'please enter your name',
    },
    userEmail: {
        general: 'userEmail',
        type: 'email',
        label: 'E-mail',
        placeholder: 'please enter your e-mail',
    },
    about: {
        general: 'about',
        type: 'text',
        label: 'About',
        placeholder: '',
    },
};