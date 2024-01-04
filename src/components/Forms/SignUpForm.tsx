'use client'

import React, { useContext } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons/icons"
import Link from "next/link";
import { FormInput } from '../formInput/formInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchemaUp } from '@/validations/SignUpUserValidation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "@/context/authContext";
import { setCookie } from 'cookies-next';

type FormData = {
    firsName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
};

export function SignUpForm(): React.ReactElement {

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(userSchemaUp) });

    const { setIsAuthenticated } = useContext(Context);

    const onSubmit = async (data: FormData) => {
        try {

            const userData = {
                email: data.email,
                password: data.password,
                firsName: data.firsName,
                lastName: data.lastName,
                phoneNumber: "",
                address: "",
                postalCode: "",
                city: "",
                country: "",
                classification: 0,
                longDescription: "",
                shortDescription: "",
                avatar: "",
                userRole: 0,
                birthdate: new Date(),
                createdAt: new Date(),
            };

            const response = await fetch('https://localhost:7215/api/Users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setIsAuthenticated(true);

                const token = await response.text();
                toast.success('Registration successfully!');

                setTimeout(() => {
                    setCookie('token', token, {
                        maxAge: 604800,
                    });
                    setCookie('userType', userData.userRole);
                    location.href = '/offers';
                }, 1000);
            } else if (response.status === 400) {
                toast.error('Email already exists!');
            } else {
                toast.error('Something went wrong! Please try again.')
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    // const handleGoogleSignIn = async () => {

    //     const authorizationUrl = 'https://accounts.google.com/o/oauth2/auth?client_id=808709125795-qtmuedb7hj322i7os3ojsjtb1hfj8qhu.apps.googleusercontent.com&redirect_uri=http://localhost:3000/offers&response_type=code&scope=email%20profile';

    //     window.location.href = authorizationUrl;
    // };

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
                            <Card className="border-0 justify-center items-center space-y-6">
                                <CardContent>
                                    <Card className="border-0">
                                        <CardHeader>
                                            <div className="grid justify-items-center pb-[25px]">
                                                <img src="/BigLogo.png" className="w-50 h-60 i" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex gap-5 ">
                                                    <FormInput control={control} type="text" name="firsName"
                                                        errorMessage={errors.firsName?.message} label="First Name" />
                                                    <FormInput control={control} type="text" name="lastName"
                                                        errorMessage={errors.lastName?.message} label="Last Name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <FormInput control={control} type="text" name="email"
                                                        errorMessage={errors.email?.message} label="Email" />
                                                    <FormInput control={control} type="password" name="password"
                                                        errorMessage={errors.password?.message} label="Password" />
                                                    <FormInput control={control} type="password" name="repeatPassword"
                                                        errorMessage={errors.repeatPassword?.message}
                                                        label="Repeat Password" />
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
                                                <div className="space-y-8">
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <Button variant="outline" type='button'>
                                                            <Icons.google className="mr-2 h-4 w-4" />
                                                            Google
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <Button variant="destructive" className="bg-sky-600 w-full">
                                                            Sign Up
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <CardFooter className="justify-center">
                                        <Link
                                            href={"/auth/sign-in"}
                                            className={`${buttonVariants({
                                                variant: 'link',
                                            })}`}>
                                            Already have an account?
                                        </Link>
                                    </CardFooter>
                                </CardContent>
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

export default SignUpForm;
