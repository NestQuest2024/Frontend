'use client';
import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormInput } from '../formInput/formInput';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
    password: string;
    confirmPassword: string;
}

export function PasswordReset(): React.ReactElement {
    const schema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required!')
            .min(6, 'Password must have at least 6 characters')
            .matches(
                /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                'Password must contain at least 1 uppercase letter and 1 special character'
            ),
        confirmPassword: Yup.string()
            .required('Repeat Password is required!')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(schema) });

    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState<string>('');

    const onSubmit = async (data: FormData) => {

        const updatedPassword = {
            password: data.password,
        };

        console.log(data);
        const response = await fetch(`https://localhost:7215/api/Users/passwordReset/${userId}/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPassword),
        });


        if (response.ok) {
            toast.success('Password reset successfully');
            setTimeout(() => {
                window.location.href = '/auth/sign-in';
              }, 2000);
        } else {
            console.error('Erro ao solicitar redefinição de senha:', response.statusText);
            toast.error('Error while requesting password reset');
        }
    };

    useEffect(() => {
        const urlSegments = window.location.pathname.split('/');
        const userIdIndex = urlSegments.indexOf('passwordReset') + 1;
        const tokenIndex = userIdIndex + 1;

        if (userIdIndex >= 0 && tokenIndex < urlSegments.length) {
            const userId = urlSegments[userIdIndex];
            const token = urlSegments[tokenIndex];

            setUserId(userId);
            setToken(token);

        } else {
            console.error('Invalid URL format for password reset');
        }
    }, []);

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
                            type="password"
                            name="password"
                            label='Password'
                            control={control}
                            errorMessage={errors.password?.message}
                        />
                        <br />
                        <FormInput
                            type="password"
                            name="confirmPassword"
                            label='Repeat Password'
                            control={control}
                            errorMessage={errors.confirmPassword?.message}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 w-96 text-white rounded px-4 py-2 mt-5"
                        >
                            Reset Password
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

export default PasswordReset;


