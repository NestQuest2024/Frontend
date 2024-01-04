import * as Yup from 'yup';

export const profileScheema = Yup.object().shape({
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    postalCode: Yup.string().required("Postal code is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    longDescription: Yup.string().required("Long description is required"),
    shortDescription: Yup.string().required("Short description is required"),
    avatar: Yup.string().required("Avatar is required"),
    //birthdate: Yup.string().required("Birth date is required"),
});
