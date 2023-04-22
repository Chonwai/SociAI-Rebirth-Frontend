import * as yup from 'yup';

export const ShibaSchema = yup.object().shape({
    style: yup.string().required(),
    length: yup.string().required(),
    description: yup.string().required(),
    region: yup.string().required(),
    tone: yup.string().required(),
    language: yup.string().required(),
    hashtagCount: yup.number().min(1).max(20).required()
});
