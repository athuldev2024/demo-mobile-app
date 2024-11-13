import * as Yup from 'yup';

const LoginvalidationSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{9,10}$/, 'Mobile number must be either 9 or 10 digits'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 8 characters'),
});

export {LoginvalidationSchema};
