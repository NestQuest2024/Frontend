import * as Yup from 'yup';

export const commentScheema = Yup.object().shape({
    text: Yup.string().required('Comment is required'),
    //rate: Yup.number().min(1).max(5).required('Rate is required'),
});
