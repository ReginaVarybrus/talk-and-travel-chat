import * as yup from 'yup';

export const ABOUT_MAX_CHAR_LIMIT = 200;

export const schema = yup.object().shape({
    userName: yup
        .string()
        .transform(value => (value ? value.trim() : ''))
        .min(2, 'Name must be between 2 and 16 characters.')
        .max(30, 'Name must be between 2 and 16 characters.')
        .matches(/^[a-zA-Z0-9 ]{2,16}$/, 'Name can only contain latin letters, numbers, and spaces, and must be between 2 and 16 characters.')
        .test(
            'not-only-spaces',
            'User name cannot consist of spaces only.',
            value => value && value.trim() !== ''
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
    about: yup
        .string()
        .nullable()
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