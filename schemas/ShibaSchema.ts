import * as yup from 'yup';

export const ShibaSchema = yup.object().shape({
    style: yup.string().required(),
    length: yup.string().required(),
    description: yup.string().required(),
    region: yup.string().required()
});
