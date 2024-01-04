import { Badge } from "@/components/ui/badge";
import React from "react";
import { Navigation, Euro, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';
import { AvatarImage } from "@radix-ui/react-avatar";

interface User {
    firsName: string;
    lastName: string;
    avatar: string;
}

interface Category {
    id: number;
    name: string;
}

interface Offer {
    id: number;
    title: string;
    description: string;
    price: number;
    offerTimeUnitName: string;
    location: string;
    placeName: string;
    image1: string;
    category: Category;
    statusName: string;
    createdBy: User;
}

export default function OfferCard({ offer }: { offer: Offer }) {

    return (
        <>
            <Link href={`/jobPage/${offer.id}`}>
                <div key={offer.id}>
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
                            <div className="justify-center items-center gap-2 flex pr-2">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <Avatar>
                                        <AvatarImage
                                            src={offer.createdBy.avatar}
                                            alt='Avatar'
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <AvatarFallback>
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="text-gray-700 text-sm font-['Inter'] leading-[14px] font-semibold">{offer.createdBy.firsName} {offer.createdBy.lastName}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
