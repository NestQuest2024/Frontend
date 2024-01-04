import * as Yup from 'yup';

export const userSchemaUp = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string()
        .required('Password is required!')
        .min(6, 'Password must have at least 6 characters')
        .matches(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
            'Password must contain at least 1 uppercase letter and 1 special character'
        ),
    repeatPassword: Yup.string()
        .required('Repeat Password is required!')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    firsName: Yup.string()
        .required('First name is required!')
        .matches(/^[a-zA-Záàâãéèêíïóôõöúç\s]+$/, 'First name must contain only letters and may include special characters'),
    lastName: Yup.string()
        .required('Last name is required!')
        .matches(/^[a-zA-Záàâãéèêíïóôõöúç\s]+$/, 'Last name must contain only letters and may include special characters'),
});
