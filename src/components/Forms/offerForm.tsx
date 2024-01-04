'use client';
import { InputFile } from "@/components/ui/file";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { serviceSchema } from "@/validations/ServiceValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "@/components/formInput/formInput";
import { TextareaWithLabel } from "../ui/text-area-with-label";
import { useUploadFile } from "./hooks/use-upload-file.hook";
import { useGetCategories } from "./hooks/use-get-categories.hook";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { Label } from "@/components/ui/label"
import { use, useContext, useEffect, useState } from "react";
import { WorkPlaceSelect } from "../WorkPlaceSelect/WorkPlaceSelect";
import { OfferTimeUnitSelect } from "../OfferTimeUnitSelect/OfferTimeUniteSelect";
import { LocationInput } from "../locationInput/locationInput";
import { Context } from "@/context/authContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
    title: string;
    price: number;
    description: string;
    image1: string;
    image2: string;
    image3: string;
};

export default function OfferForm() {
    const { categories } = useGetCategories();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedWorkPlace, setSelectedWorkPlace] = useState<number | null>(null);
    const [selectedOfferTimeUnit, setSelectedOfferTimeUnit] = useState<number | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const { getUserInfo } = useContext(Context);
    const [offersCount, setOffersCount] = useState<number>(0);

    const { control, handleSubmit, formState: { errors }, register } = useForm<FormData>({
        resolver: yupResolver(serviceSchema),
    });

    const { handleUploadFile, handleSelectFile } = useUploadFile();

    const handleSelectOfferTimeUnit = (selectedOfferTimeUnit: number) => {
        setSelectedOfferTimeUnit(selectedOfferTimeUnit);
    };

    const handleSelectWorkPlace = (selectedWorkPlace: number) => {
        setSelectedWorkPlace(selectedWorkPlace);
    };

    const getOffersCount = async () => {

        if (userInfo && userInfo.id) {
            const response = await fetch(`https://localhost:7215/api/Users/${userInfo.id}/Offers`);
            const responseData = await response.json();
            setOffersCount(responseData.length);
        }
    };

    const onSubmit = async (data: FormData) => {

        try {
            const uploadedImageURLs = await handleUploadFile();

            const offerData = {
                title: data.title,
                price: data.price,
                location: selectedLocation,
                category: { id: selectedCategory, name: selectedCategoryName },
                place: selectedWorkPlace,
                description: data.description,
                image1: uploadedImageURLs[0],
                image2: uploadedImageURLs[1],
                image3: uploadedImageURLs[2],
                offerTimeUnit: selectedOfferTimeUnit,
                createdBy: {
                    id: userInfo.id, firsName: 'x', lastName: 'x', email: 'x', password: 'x', phoneNumber: 'x', address: 'x',
                    postalCode: 'x', city: 'x', country: 'x', classification: 1, longDescription: 'x', shortDescription: 'x',
                    avatar: 'x', userRole: 1, birthdate: new Date(), createdAt: new Date(), updatedAt: new Date()
                },
                createdAt: new Date(),
                updatedAt: new Date(),
                closedAt: new Date(),
            };

            const response = await fetch('https://localhost:7215/api/Offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(offerData),
            });

            if (response.ok) {
                const responseData = await response.json();
                toast.success('Offer created successfully!');
                location.href = `/jobPage/${responseData.id}`;
            } else {
                toast.error('Error creating offer! You must fill all fields!');
            }
        } catch (error) {
            console.error('Erro ao processar formulário:', error);
        }
    };

    useEffect(() => {
        getUserInfo()
            .then((userInfoResponse: any) => {
                setUserInfo(userInfoResponse.userInfo);
                console.log(userInfoResponse.userInfo);
            })
            .catch((error: any) => {
                console.error('Error fetching user information:', error);
            });
    }, []);

    useEffect(() => {
        getOffersCount();
    }, [userInfo]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-20 space-y-6">
                    <div className="flex flex-col justify-center">
                        <div className="text-center">
                            <p className="text-6xl font-medium">Create your offer here!</p>
                        </div>
                        <div className="text-center p-4">
                            <p className="text-lg font-medium text-sky-600 italic">Crafting Careers, Building Futures: Your
                                Path to Success Starts Here!</p>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div>
                            <p className="text-lg font-medium">Thumbnails</p>
                            <p className="text-sm font-normal"> Upload at least 3 images!</p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <InputFile handleSelectedFile={handleSelectFile} control={control} name="image1"
                                errorMessage={errors.image1?.message} />
                            <InputFile handleSelectedFile={handleSelectFile} control={control} name="image2"
                                errorMessage={errors.image2?.message} />
                            <InputFile handleSelectedFile={handleSelectFile} control={control} name="image3"
                                errorMessage={errors.image3?.message} />
                        </div>
                        <div className="flex flex-row gap-5 item">
                            <FormInput control={control} type="text" name="title" errorMessage={errors.title?.message}
                                label="Title" />
                            <FormInput control={control} type="text" name="price" errorMessage={errors.price?.message}
                                label="Price" />
                            <LocationInput
                                label="Location"
                                onSelectLocation={setSelectedLocation}
                                name="location"
                            />
                        </div>
                        <div className="flex flex-row gap-5 item">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label>Category</Label>
                                <CategorySelect
                                    categories={categories}
                                    onSelectCategory={setSelectedCategory}
                                    passCategoryName={setSelectedCategoryName}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label>Work by:</Label>
                                <OfferTimeUnitSelect
                                    onSelectTimeUnit={handleSelectOfferTimeUnit}
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label>WorkPlace</Label>
                                <WorkPlaceSelect
                                    onSelectWorkPlace={handleSelectWorkPlace}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 item">
                            <TextareaWithLabel
                                label="Description"
                                message="Description"
                                control={control}
                                name="description"
                                errorMessage={errors.description?.message}
                            />
                        </div>
                    </div>
                    <div className="items-center justify-center">
                        {
                            offersCount === 3 && userInfo.userType === "Nest" || offersCount === 10 && userInfo.userType === "Premium" ? (
                                <>
                                <Button type="submit" variant="secondary" className="bg-sky-500" disabled>Create Offer</Button>
                                <hr className="my-4" />
                                <p className="text-red-500">You have reached the maximum number of offers!</p>
                                </>
                            ) : (
                                <Button type="submit" variant="secondary" className="bg-sky-500">Create Offer</Button>
                            )
                        }
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
    )
}