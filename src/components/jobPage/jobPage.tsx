'use client';
import React, { useEffect, useState, useContext } from "react";
import { MdOutlineMarkEmailRead, MdOutlineRateReview } from 'react-icons/md'
import { BiMap } from 'react-icons/bi'
import { FiMail } from 'react-icons/fi'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaRegStar } from 'react-icons/fa'
import { HiOutlinePhone, HiOutlineClock } from 'react-icons/hi'
import { Button } from "../ui/button";
import useFetchUserOffers from "../Forms/hooks/use-get-user-offers.hook";
import Link from 'next/link';
import { Context } from "@/context/authContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { commentScheema } from "@/validations/CommentValidation";
import { FormInput } from "../formInput/formInput";
import usePostNotifications from "@/components/Forms/hooks/use-get-notifications.hook";
import useSetOfferStatus from "@/components/Forms/hooks/use-set-offer-status.hook";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    text: string;
}

interface Commentary {
    id: number;
    text: string;
    rate: number;
    userId: number;
    createdAt: string;
}

interface CommentData {
    id: number;
    text: string;
    rate: number;
    userId: number;
    createdAt: string;
    formattedDate: string;
    userData: any;
}

interface User {
    id: number;
    firsName: string;
    lastName: string;
    email: string;
    avatar: string;
    city: string;
    country: string;
    createdAt: string;
    phoneNumber: string;
}

interface Category {
    id: number;
    name: string;
}

interface Hiring {
    id: number;
    userId: number;
    offerId: number;
    createdAt: string;
}

interface OfferDetail {
    id: number;
    title: string;
    description: string;
    price: number;
    offerTimeUnitName: string;
    location: string;
    placeName: string;
    image1: string;
    image2: string;
    image3: string;
    category: Category;
    statusName: string;
    createdBy: User;
    comments: Commentary[] | null;
    hirings: Hiring[] | null;
    createdAt: string;
}

interface JobPageProps {
    offerDetail: OfferDetail;
}

export function JobPage({ offerDetail }: JobPageProps): React.ReactElement {
    const { userOffers, fetchOffersByUser } = useFetchUserOffers(offerDetail.createdBy.id || 0);
    const { isAuthenticated: auth } = useContext(Context);
    const { getUserInfo } = useContext(Context);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [commentsWithUserData, setCommentsWithUserData] = useState<CommentData[]>([]);
    const [selectedStars, setSelectedStars] = useState<number>(0);
    const [hiredCount, setHiredCount] = useState<number>(0);
    const [averageRate, setAverageRate] = useState<number>(0);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(commentScheema) });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    };

    const formatDateTime = (dateTimeString: string) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toISOString().split('T')[0];
        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${date} at ${time}h`;
    };

    const handleStarClick = (value: number) => {
        if (value) {
            setSelectedStars(value);
        }
    };

    const getUserById = async (id: number) => {
        try {
            const response = await fetch(`https://localhost:7215/api/Users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao obter dados do usuário");
            }

            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error("Erro na requisição:", error);
            throw error;
        }
    };

    const fetchComments = async () => {
        try {
            const commentsWithUserData = await Promise.all(
                (offerDetail.comments || []).map(async (comment) => {
                    const createdAtDate = new Date(comment.createdAt);
                    const dateFormatOptions: Intl.DateTimeFormatOptions = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    };
                    const formattedDate = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(createdAtDate);
                    const userData = await getUserById(comment.userId);

                    return {
                        ...comment,
                        formattedDate,
                        userData,
                    };
                })
            );

            return commentsWithUserData;
        } catch (error) {
            console.error("Erro na requisição:", error);
            throw error;
        }
    };

    const postComment = async (data: FormData) => {
        try {
            const commentData = {
                text: data.text,
                rate: selectedStars,
                userId: userInfo.id,
                offerId: offerDetail.id,
                createdAt: new Date(),
            }
            const response = await fetch(`https://localhost:7215/api/Comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                toast.error('Unable to post comment, please try again later!');
                return;
            }

            toast.success('Comment posted successfully!')

            setCommentsWithUserData((prevComments) => [
                ...prevComments,
                {
                    id: Date.now(),
                    text: commentData.text,
                    rate: commentData.rate,
                    userId: commentData.userId,
                    createdAt: new Date().toISOString(),
                    formattedDate: formatDate(new Date().toISOString()),
                    userData: userInfo,
                },
            ]);
        } catch (error) {
            console.error("Erro na requisição:", error);
            throw error;
        }
    };

    useEffect(() => {
        setHiredCount(offerDetail.hirings?.length || 0);
        if (offerDetail.comments) {
            const averageRate = offerDetail.comments.reduce((sum, comment) => sum + comment.rate, 0) / offerDetail.comments.length;
            setAverageRate(averageRate);
        }

        fetchComments().then((comments) => {
            setCommentsWithUserData(comments);
        });

        if (auth) {
            getUserInfo()
                .then((userInfoResponse: any) => {
                    setUserInfo(userInfoResponse.userInfo);
                })
                .catch((error: any) => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, [auth]);

    return (
        <>
            <div className="h-full">
                <div className="p-4 flex gap-5 flex-wrap">
                    <div
                        className="flex-[68%] sh-64 bg-white border-2 border-slate-300 rounded-xl my-4 p-4">
                        <div className="px-6 py-4">
                            <div className="font-bold text-2xl mb-2">
                                {offerDetail.title}
                            </div>
                            <p className="text-gray-700 text-base">
                                {offerDetail.description}
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-10/12 mx-auto border-t border-gray-300" />
                            </div>
                        </div>
                        <div className="pl-8 flex flex-wrap justify-center gap-5 pt-4 w-full h-[400px] flex-col md:flex-row">
                            <img
                                src={offerDetail.image1}
                                alt="Offer Image 1"
                                className="flex-[30%] h-96 object-cover rounded-20"
                            />
                            <div className="flex-[20%] h-96 flex gap-5 flex-row md:flex-col">
                                <img
                                    src={offerDetail.image2}
                                    alt="Offer Image 2"
                                    className="flex-1 w-72 h-40 object-cover rounded-20"
                                />
                                <img
                                    src={offerDetail.image3}
                                    alt="Offer Image 3"
                                    className="flex-1 w-72 h-40 object-cover rounded-20"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col px-6">
                            <div className="py-3 flex">
                                {offerDetail.statusName === "OPEN" ?
                                    <span className="text-justify inline-block bg-green-200 rounded-full px-2 py-0.5 text-sm font-semibold text-gray-700 mr-2">{offerDetail.statusName}</span> :
                                    <span className="text-justify inline-block bg-red-200 rounded-full px-2 py-0.5 text-sm font-semibold text-gray-700 mr-2">{offerDetail.statusName}</span>
                                }
                                <p>Posted {formatDateTime(offerDetail.createdAt)}</p>
                            </div>
                            <p className="px-1"><span className="font-bold">Price:</span> {offerDetail.price}€ / {offerDetail.offerTimeUnitName}</p>
                        </div>
                        <div className="px-7 py-3 text-sm">
                            <p>ServiceID #{offerDetail.id}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-10/12 mx-auto border-t border-gray-300" />
                            </div>
                        </div>
                        <div className="px-6 py-4 space-y-3">
                            <span className="font-bold text-xl mb-2">About This Offer:</span>
                            <div className="flex space-x-6">
                                <div className="flex space-x-2 justify-items-center">
                                    <MdOutlineMarkEmailRead size={25} />
                                    <p>{hiredCount} Signings</p>
                                </div>
                                <div className="flex space-x-2 justify-items-center">
                                    <BiMap size={25} />
                                    <p>{offerDetail.placeName} Project</p>
                                </div>
                                <div className="flex space-x-2 justify-items-center">
                                    <MdOutlineRateReview size={25} />
                                    <p>Average Rating: {averageRate || 0}</p>
                                </div>
                            </div>
                            {
                                offerDetail.statusName === "OPEN" && userInfo ? (
                                    <Button className="bg-green-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            const notificationData = {
                                                offerId: offerDetail.id,
                                                userId: userInfo.id,
                                                createdAt: new Date(),
                                            }
                                            usePostNotifications(notificationData);
                                            useSetOfferStatus(offerDetail.id, 1);
                                        }}
                                    >
                                        Hire Service
                                    </Button>
                                ) : (
                                    <Button className="bg-red-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" disabled>
                                        Service Closed
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex-[30%]">
                        <div className="w-full h-fit bg-white border-2 border-slate-300 rounded-xl my-4 p-4">
                            <div className="px-6 py-4">
                                <p className="font-bold text-2xl mb-2">Nest Information</p>
                                <div className="flex space-x-2 items-center">
                                    <BsFillPersonFill size={25} />
                                    <p className="text-gray-700 text-base">{offerDetail.createdBy.firsName} {offerDetail.createdBy.lastName}</p>
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <BiMap size={25} />
                                    <p className="text-gray-700 text-base">{offerDetail.createdBy.city} {offerDetail.createdBy.country}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <HiOutlineClock size={24} />
                                    <p>Member since: {formatDate(offerDetail.createdBy.createdAt)}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-4/5 mx-auto border-t border-gray-300" />
                                </div>
                            </div>
                            <div className="items-center">
                                <p className="font-bold text-xl px-6 py-4">Nest Contacts</p>
                                <div className="px-6 flex space-x-10">
                                    <div
                                        className="flex gap-3 items-center cursor-pointer"
                                        onClick={() => {
                                            const phoneNumber = offerDetail.createdBy.phoneNumber;
                                            const message = "Hi! I am interested in your offer.";
                                            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                            window.location.href = whatsappLink;
                                        }}
                                    >
                                        <HiOutlinePhone size={22} />
                                        {offerDetail.createdBy.phoneNumber}
                                    </div>
                                    <div
                                        className="flex gap-3 items-center cursor-pointer"
                                        onClick={() => {
                                            const emailSubject = "Hire Service";
                                            const emailBody = "Hi! I am interested in your offer.";
                                            window.location.href = `mailto:${offerDetail.createdBy.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                                        }}
                                    >
                                        <FiMail size={22} />
                                        {offerDetail.createdBy.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-fit bg-white border-2 border-white my-4 p-4">
                            <div className="px-6 py-4">
                                <div className="font-bold text-2xl mb-2">Other Services From This Nest</div>
                                {userOffers.map((offer) => (
                                    <Link href={`/jobPage/${offer.id}`}>
                                        <div className="items-center">
                                            <p className="text-gray-700 text-base font-bold mt-5">{offer.title}</p>
                                            <p className="font-light">{offer.price}€/{offer.offerTimeUnitName}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex gap-5 justify-between">
                    <div className="w-full sh-64 md:h-96 lg:h-1/2 bg-white border-2 border-slate-300 rounded-xl my-4 p-4">
                        <form onSubmit={handleSubmit(postComment)}>
                            <div className="px-6 py-4">
                                <div className="font-bold text-2xl mb-2">Comments:</div>
                                <div className="flex items-center">
                                    <FormInput
                                        type="text"
                                        name="text"
                                        label='Comment Here'
                                        control={control}
                                        errorMessage={errors.text?.message}
                                    />
                                    <div className="flex ml-10 cursor-pointer gap-1">
                                        {[1, 2, 3, 4, 5].map((starValue) => (
                                            <FaRegStar
                                                key={starValue}
                                                size={25}
                                                onClick={() => handleStarClick(starValue)}
                                                className={starValue <= selectedStars ? 'text-yellow-400' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                    <Button variant={"outline"} className="bg-blue-400 hover:bg-blue-600 text-white font-bold ml-10 py-2 px-4 rounded"
                                        type="submit"
                                    >Submit</Button>
                                </div>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-11/12 mx-auto border-t border-gray-300" />
                            </div>
                        </div>
                        {commentsWithUserData.map((comment) => (
                            <div key={comment.id} className="px-6 py-4 space-y-6">
                                <div className="flex text-yellow-400">
                                    {[...Array(comment.rate)].map((_, index) => (
                                        <FaRegStar key={index} size={25} />
                                    ))}
                                    {[...Array(5 - comment.rate)].map((_, index) => (
                                        <FaRegStar key={comment.rate + index} size={25} className="text-gray-300" />
                                    ))}
                                </div>
                                <div className="">
                                    <p>{comment.text}</p>
                                </div>
                                <div className="">
                                    <p className="text-sky-500 cursor-pointer">{comment.userData?.firsName} {comment.userData?.lastName}</p>
                                    <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
                                        {comment.formattedDate}
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-11/12 mx-auto border-t border-gray-300" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
    )
}
