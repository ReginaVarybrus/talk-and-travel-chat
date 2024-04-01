import * as yup from 'yup';

export const schema = yup.object().shape({
    userEmail: yup
        .string()
        .transform(value => (value ? value.trim() : ''))
        .min(6)
        .max(256)
        .email()
        .matches(
            /^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/,
            'Invalid email address'
        )
        .required('The field is empty'),
    enter_password: yup.string().min(8).max(30).required('The field is empty'),
});

export const formFields = {
    userEmail: {
        general: 'userEmail',
        type: 'email',
        placeholder: 'E-mail',
    },
    password: {
        general: 'enter_password',
        type: 'password',
        placeholder: 'Password',
    },
};
