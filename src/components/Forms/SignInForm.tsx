'use client'

import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons/icons"
import { Logonq } from "@/components/logo/logonq";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from '../formInput/formInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/validations/SignInUserValidation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "@/context/authContext";
import { setCookie } from 'cookies-next';

type FormData = {
    email: string;
    password: string;
};

export function SignInForm(): React.ReactElement {

    const { setIsAuthenticated } = useContext(Context);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(userSchema) });

    const onSubmit = async (data: FormData) => {

        try {
            const offerData = {
                email: data.email,
                password: data.password,
                firsName: "x",
                lastName: "y",
                phoneNumber: "123456789",
                address: "Rua x",
                postalCode: "1234-567",
                city: "Porto",
                country: "Portugal",
                classification: 0,
                longDescription: "x",
                shortDescription: "y",
                avatar: "x",
                userRole: 0,
                birthdate: new Date(),
                createdAt: new Date(),
            };

            const response = await fetch('https://localhost:7215/api/Users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(offerData),
            });

            if (response.ok) {
                setIsAuthenticated(true);
                const token = await response.text();
                setCookie('token', token, {
                    maxAge: 604800,
                });
                location.href = '/offers';
                toast.success('Login successfully!');
            } else {
                toast.error('Login failed. Please try again!');
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <div className="flex">
                        <img
                            src={"/loginImg.jpg"}
                            className="w-full md:w-2/5 bg-black h-[calc(100vh-65px)] md:block hidden"
                            alt={"login"}
                        />
                        <div className="w-3/5 justify-center items-center flex flex-col">
                            <Card className="border-0">
                                <CardHeader className="">
                                    <CardTitle>Sign In</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle></CardTitle>
                                            <CardDescription className="font-medium text-lg">Enter your data below to sign in
                                                your account</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <FormInput control={control} type="text" name="email" errorMessage={errors.email?.message} label="Email" />
                                                    <FormInput control={control} type="password" name="password" errorMessage={errors.password?.message} label="Password" />
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <label className="flex items-center space-x-1">
                                                        <Checkbox className="text-black items-center" />
                                                        <span className="font-medium text-xs">Remember me</span>
                                                    </label>
                                                    <Link href="/auth/recoverPassword">
                                                        <p className="text-sky-600 hover:underline text-xs">Forgot Password?</p>
                                                    </Link>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute inset-0 flex items-center">
                                                        <span className="w-full border-t" />
                                                    </div>
                                                    <div
                                                        className="relative flex justify-center items-center lowercase font-normal">
                                                        <span className="bg-white px-2 text-muted-foreground-">
                                                            Or continue with
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-10">
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <Button variant="outline">
                                                            <Icons.google className="mr-2 h-4 w-4" />
                                                            Google
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <Button variant="destructive" className="bg-sky-600 w-full">
                                                            Sign In
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                                <Logonq />
                            </Card>
                        </div>
                    </div>
                </div>
            </form>
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
}

export default SignInForm;