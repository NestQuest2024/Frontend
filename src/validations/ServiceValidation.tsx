import * as Yup from 'yup';

export const serviceSchema = Yup.object().shape({
    title: Yup.string().required('Title is required!'),
    price: Yup.number().typeError('Price must be a valid number').required('Price is required!'),
    description: Yup.string().required('Description is required!'),
    image1: Yup.string().required('Picture 1 is required!'),
    image2: Yup.string().required('Picture 2 is required!'),
    image3: Yup.string().required('Picture 3 is required!'),
});
