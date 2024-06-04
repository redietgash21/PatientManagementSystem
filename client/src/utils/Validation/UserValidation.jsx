






import * as yup from 'yup';

export const userSchema=yup.object().shape({
    firstName: yup.string("invalid first name").required(),
    lastName: yup.string().required(),
    // firstName: yup.string().required(),
    // firstName: yup.string().required(),
})