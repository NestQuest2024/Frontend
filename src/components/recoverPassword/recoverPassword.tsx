'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormInput } from '../formInput/formInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
    email: string;
}

export function RecoverPassword(): React.ReactElement {
    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    const onSubmit = async (data: FormData) => {

        const response = await fetch('https://localhost:7215/api/Users/passwordReset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            toast.success('Email sent successfully! Check your inbox.');
        } else {
            console.error('Erro ao solicitar redefinição de senha:', response.statusText);
            toast.error('Error sending email. Please try again!');
        }
    };

    return (
        <>
            <div className='w-full flex'>
                <img
                    src={"/loginImg.jpg"}
                    className="w-full md:w-2/5 bg-black h-[calc(100vh-65px)] md:block hidden"
                    alt={"login"}
                />
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex-grow flex items-center justify-center">
                    <div className='w-96 flex flex-col items-center'>
                        <div className="grid justify-items-center pb-[30px]">
                            <img src="/BigLogo.png" className="w-50 h-60 i" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Reset Password:</h2>
                        <FormInput
                            type="email"
                            name="email"
                            label=''
                            control={control}
                            errorMessage={errors.email?.message}
                        />
                        <p className="text-sm my-5 text-center">Enter your email address and we will send you a link to reset your password.</p>
                        <button
                            type="submit"
                            className="bg-blue-500 w-96 text-white rounded px-4 py-2"
                        >
                            Send Reset Email
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default RecoverPassword;


