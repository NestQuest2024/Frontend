'use client'
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Divider, Text } from "@tremor/react";
import { Badge } from "@/components/ui/badge";
import { Navigation, Euro, MapPin, Trash2, Eye, EyeOff } from "lucide-react";
import {
    Carousel, CarouselContent, type CarouselApi,
} from "@/components/ui/carousel";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CardContent } from "@/components/ui/card";
import { Context } from "@/context/authContext";
import useFetchUserOffers from "../Forms/hooks/use-get-user-offers.hook";
import useSetOfferStatus from "@/components/Forms/hooks/use-set-offer-status.hook";
import Link from 'next/link';

export function OffersMaded(): React.ReactElement {
    const { isAuthenticated: auth, getUserInfo } = useContext(Context);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const { userOffers, fetchOffersByUser } = useFetchUserOffers(userInfo?.id || 0);
    const [shouldReload, setShouldReload] = useState(false);
    
    const handleDeleteOffer = async (id: number) => {
        try {
            const response = await fetch(`https://localhost:7215/api/Offers/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // const updatedOffers = userOffers.filter(offer => offer.id !== id);
                // setUserOffers(updatedOffers);
                toast.success('Offer Deleted Successfully!');
                fetchOffersByUser();
            } else {
                toast.error('Error Deleting Offer!');
            }
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    useEffect(() => {
        if (!api) {
            return;
        }

        if (auth) {
            getUserInfo()
                .then((userInfoResponse: any) => {
                    setUserInfo(userInfoResponse.userInfo);
                })
                .catch((error: any) => {
                    console.error('Error fetching user information:', error);
                });
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        }, [api, auth]);
    }, [api, auth]);

    useEffect(() => {
        const fetchData = async () => {
          if (auth && shouldReload === false) {
            try {
              await fetchOffersByUser();
              setShouldReload(false);
            } catch (error) {
              console.error('Error fetching user offers:', error);
            }
          }
        };
      
        fetchData();
      }, [auth, fetchOffersByUser, shouldReload]);

    return (
        <>
            <div className="p-4 space-y-2">
                <div className="flex flex-row gap-4">
                    <Card className="bg-white space-y-6" decoration="bottom" decorationColor="blue">
                        <Text className="text-xl font-semibold text-black">Offers Created:</Text>
                        <Divider></Divider>
                        <div className="w-full justify-center items-center flex flex-col">
                            <Carousel setApi={setApi} className="w-full max-w-full">
                                <CarouselContent className={`flex gap-4 ${userOffers.length <= 3 ? 'justify-center' : ''}`}>
                                    {userOffers.map((offer: any) => (
                                        <Card key={offer.id} className="flex flex-col w-1/2 items-center justify-center">
                                            <CardContent className="flex flex-col aspect-square items-center justify-center p-6 relative">
                                                <div>
                                                    <div className="px-2.5 pt-2.5 pb-3 bg-white rounded-md border-2 border-zinc-200 flex-col justify-start items-start gap-2 inline-flex">
                                                        <div className="justify-start items-start gap-2 inline-flex">
                                                            <img
                                                                src={offer.image1}
                                                                alt="Offer Image"
                                                                className="w-screen h-[250px] object-cover rounded-[5px]"
                                                            />
                                                        </div>
                                                        <div className="space-y-0 min-h-[60px] max-h-[60px] overflow-hidden">
                                                            <p className="text-base font-bold">
                                                                {offer.title && offer.title.length > 40 ? offer.title.slice(0, 40) + '...' : offer.title}
                                                            </p>
                                                            <p className="text-sm">
                                                                {offer.description && offer.description.length > 100 ? offer.description.slice(0, 100) + '...' : offer.description}
                                                            </p>
                                                        </div>
                                                        <div className="flex flex-row gap-1">
                                                            {offer.statusName === "OPEN" ?
                                                                <Badge variant="secondary" className="bg-lime-300 items-center justify-center">{offer.statusName}</Badge> :
                                                                <Badge variant="secondary" className="bg-red-300 items-center justify-center">{offer.statusName}</Badge>
                                                            }
                                                            <Badge variant="secondary" className="bg-amber-200 items-center justify-center">{offer.category.name}</Badge>
                                                        </div>
                                                        <div className="self-stretch justify-between items-start inline-flex">
                                                            <div className="flex-col justify-start items-start gap-[5px] inline-flex">
                                                                <div className="justify-start items-center gap-1 inline-flex">
                                                                    <Euro size={15} className="text-black" />
                                                                    <div className="text-black text-sm font-medium font-['Inter'] leading-4">{offer.price} €/{offer.offerTimeUnitName}</div>
                                                                </div>
                                                                <div className="w-[187.50px] justify-start items-center gap-[5px] inline-flex">
                                                                    <Navigation size={15} className="text-black" />
                                                                    <div className="text-black text-sm font-medium font-['Inter'] leading-4">Work: {offer.placeName}</div>
                                                                </div>
                                                                <div className="justify-start items-center gap-[5px] inline-flex">
                                                                    <MapPin size={15} className="text-black" />
                                                                    <div className="text-gray-700 text-sm font-medium font-['Inter'] leading-4">
                                                                        User from: {offer.location && offer.location.length > 25 ? offer.location.slice(0, 25) + '...' : offer.location}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Link href={`/jobPage/${offer.id}`}>
                                                                <Button className="m-2" size="sm" color="green" icon={Eye}>
                                                                    View Offer
                                                                </Button>
                                                            </Link>
                                                            <Button className="m-2" size="sm" color="red" icon={Trash2} onClick={() => handleDeleteOffer(offer.id)}>
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            {
                                                offer.statusName === "OPEN" ?
                                                    <button onClick={() => {
                                                        useSetOfferStatus(offer.id, 1)
                                                            .then(() => {
                                                                toast.success('Offer Closed Successfully!');
                                                                setShouldReload(true);
                                                            })
                                                            .catch(error => console.error('Error closing offer:', error));
                                                    }} className="flex gap-1.5 px-3 py-1 rounded items-center">
                                                        <Eye size={30} className="text-green-500" />
                                                        <p className="text-white text-md font-medium font-['Inter']">Close</p>
                                                    </button> :
                                                    <button onClick={() => {
                                                        useSetOfferStatus(offer.id, 0)
                                                            .then(() => {
                                                                toast.success('Offer Opened Successfully!');
                                                                setShouldReload(true);
                                                            })
                                                            .catch(error => console.error('Error opening offer:', error));
                                                    }} className="flex gap-1.5 px-3 py-1 rounded items-center">
                                                        <EyeOff size={30} className="text-red-600" />
                                                        <p className="text-white text-md font-medium font-['Inter']">Open</p>
                                                    </button>
                                            }
                                        </Card>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </Card>
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
    );
}
