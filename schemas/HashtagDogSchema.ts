import * as yup from 'yup';

export const HashtagDogSchema = yup.object().shape({
    style: yup.string().required(),
    amount: yup.number().min(1).max(30).required(),
    script: yup.string().required(),
    region: yup.string().required()
});
