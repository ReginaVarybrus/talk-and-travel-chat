import * as yup from 'yup';

export const ABOUT_MAX_CHAR_LIMIT = 200;

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
        .max(ABOUT_MAX_CHAR_LIMIT, `this field should be less then ${ABOUT_MAX_CHAR_LIMIT} symbols`)
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
        type: 'textarea',
        label: 'About',
        placeholder: 'you can write here something about yourself for other users',
    },
};