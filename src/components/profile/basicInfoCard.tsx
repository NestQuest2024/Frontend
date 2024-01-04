'use client';
import React, { useContext, useEffect, useState } from "react";
import { Card, Text, Divider, TextInput, DatePicker } from "@tremor/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Copy, Save } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileScheema } from "@/validations/ProfileValidation";
import { Context } from "@/context/authContext";
import { Textarea } from "@tremor/react";
import { InputFile } from "../ui/file";
import { useUploadFile } from "../Forms/hooks/use-upload-file.hook";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    phoneNumber: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    longDescription: string;
    shortDescription: string;
    avatar: string;
    //birthdate: string;
}

export function BasicInfoCard(): React.ReactElement {

    const { control, handleSubmit, formState: { errors }, register, reset } = useForm<FormData>({
        resolver: yupResolver(profileScheema),
        defaultValues: {
            phoneNumber: "",
            address: "",
            postalCode: "",
            city: "",
            country: "",
            longDescription: "",
            shortDescription: "",
            avatar: "",
        },
    });

    const { isAuthenticated: auth } = useContext(Context);
    const { getUserInfo } = useContext(Context);
    const [userInfo, setUserInfo] = useState<any>(null);
    const { handleUploadFile, handleSelectFile } = useUploadFile();
    const [userData, setUserData] = useState<any>(null);

    const onSubmit = async (data: FormData) => {
        try {
            const uploadedImageURLs = await handleUploadFile();

            const updatedUser = {
                updateData: {
                    birthdate: new Date(),
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    postalCode: data.postalCode,
                    city: data.city,
                    country: data.country,
                    longDescription: data.longDescription,
                    shortDescription: data.shortDescription,
                    avatar: uploadedImageURLs[0],
                },
            };

            const response = await fetch(`https://localhost:7215/api/Users/public/${userInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser.updateData),
            });

            if (response.ok) {
                toast.success('Data updated successfully!');
            } else {
                const errorMessage = await response.text();
                toast.error(`Error updating user: ${errorMessage}`);
                console.error('Error updating user:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getUserData = async () => {
        const response = await fetch(`https://localhost:7215/api/Users/${userInfo.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const userInfoResponse = await response.json();
        return userInfoResponse;
    }

    useEffect(() => {
        if (auth) {
            getUserInfo()
                .then((userInfoResponse: any) => {
                    setUserInfo(userInfoResponse.userInfo);
                })
                .catch((error: any) => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, [auth, getUserInfo])

    useEffect(() => {
        if (auth && userInfo) {
            getUserData()
                .then((userDataResponse: any) => {
                    setUserData(userDataResponse);
                    reset({
                        phoneNumber: userDataResponse.phoneNumber,
                        address: userDataResponse.address,
                        postalCode: userDataResponse.postalCode,
                        city: userDataResponse.city,
                        country: userDataResponse.country,
                        longDescription: userDataResponse.longDescription,
                        shortDescription: userDataResponse.shortDescription,
                    });
                })
        }
    }, [auth, userInfo]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4 space-y-2">
                    <div className="justify-between flex flex-row">
                        <h1 className="text-2xl font-semibold pb-4">User Profile</h1>
                        <Button className="bg-green-300 text-black" type="submit"><Save />Save</Button>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Card className="bg-white space-y-6" decoration="bottom" decorationColor="blue">
                            <Text className="text-xl font-semibold text-black">Basic Info:</Text>
                            <Divider></Divider>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-row">
                                        <Avatar>
                                            <AvatarImage src={"/defaultAvatar.png"}
                                                alt={"Avatar"}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <Text className="text-black text-lg">{userInfo?.firsName} {userInfo?.lastName}</Text>
                                        <div className="flex flex-row items-center gap-2">
                                            <Text>Id: {userInfo?.id}</Text>
                                            <Copy size={15} className="text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="gap-4 flex flex-row">
                                    <div className="space-y-1">
                                        <Text>First Name:</Text>
                                        <TextInput name="firsName" placeholder={userInfo?.firsName} disabled={true} />
                                    </div>
                                    <div className="space-y-1">
                                        <Text>Last Name:</Text>
                                        <TextInput name="lastName" placeholder={userInfo?.lastName} disabled={true} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Text>Birthday</Text>
                                <DatePicker
                                    placeholder="Birthday Date"
                                // {...register("birthdate")}
                                // onChange={(date) => {
                                //     setValue("birthdate", date);
                                //   }}
                                />
                                {/* {errors.birthdate && <span className="text-red-500 text-xs">This field is required</span>} */}
                            </div>
                        </Card>
                        <Card className="bg-white space-y-6" decoration="bottom" decorationColor="blue">
                            <Text className="text-xl font-semibold text-black">Addres Information:</Text>
                            <Divider></Divider>
                            <div className="flex flex-col space-y-2">
                                <div className="space-y-1">
                                    <Text>Address:</Text>
                                    <TextInput
                                        defaultValue={userData?.address}
                                        {...register("address")}
                                        errorMessage={errors.postalCode?.message}
                                    />
                                    <div className="text-red-500 text-xs">{errors.address?.message}</div>
                                </div>
                                <div className="justify-between flex flex-row">
                                    <div className="space-y-1">
                                        <Text>Postal Code:</Text>
                                        <TextInput
                                            defaultValue={userData?.postalCode}
                                            {...register("postalCode")}
                                            errorMessage={errors.postalCode?.message}
                                        />
                                        <div className="text-red-500 text-xs">{errors.city?.message}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <Text>City:</Text>
                                        <TextInput
                                            defaultValue={userData?.city}
                                            {...register("city")}
                                            errorMessage={errors.city?.message}
                                        />
                                        <div className="text-red-500 text-xs">{errors.city?.message}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <Text>Country:</Text>
                                        <TextInput
                                            defaultValue={userData?.country}
                                            {...register("country")}
                                            errorMessage={errors.country?.message}
                                        />
                                        <div className="text-red-500 text-xs">{errors.country?.message}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <Card className="bg-white space-y-6" decoration="bottom" decorationColor="blue">
                        <Text className="text-xl font-semibold text-black">Additional Information:</Text>
                        <Divider></Divider>
                        <div className="flex flex-row gap-6">
                            <div className="space-y-1">
                                <Text>Email:</Text>
                                <TextInput placeholder={userInfo?.email} disabled={true}></TextInput>
                            </div>
                            <div className="space-y-1">
                                <Text>Phone Number:</Text>
                                <TextInput
                                    defaultValue={userData?.phoneNumber}
                                    {...register("phoneNumber")}
                                    errorMessage={errors.phoneNumber?.message}>
                                </TextInput>
                                <div className="text-red-500 text-xs">{errors.phoneNumber?.message}</div>
                            </div>
                            <div className="space-y-1 w-96">
                                <Text>Short Description:</Text>
                                <Textarea
                                    id="description"
                                    defaultValue={userData?.shortDescription}
                                    {...register("shortDescription")}
                                    errorMessage={errors.shortDescription?.message}
                                />
                                <div className="text-red-500 text-xs">{errors.shortDescription?.message}</div>
                            </div>
                            <div className="space-y-1 w-96">
                                <Text>Long Description:</Text>
                                <Textarea
                                    id="description"
                                    defaultValue={userData?.longDescription}
                                    {...register("longDescription")}
                                    errorMessage={errors.longDescription?.message}
                                />
                                <div className="text-red-500 text-xs">{errors.longDescription?.message}</div>
                            </div>
                            <div className="space-y-1 w-96">
                                <InputFile handleSelectedFile={handleSelectFile} control={control} name="avatar"
                                    errorMessage={errors.avatar?.message} />
                            </div>
                        </div>
                    </Card>
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
    )
}