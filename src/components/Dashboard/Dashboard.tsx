'use client';
import { Metadata } from "next"
import Image from "next/image"
import { Users, Briefcase, HeartHandshake, XCircle, Power, CheckCheck } from "lucide-react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Sidebar from "@/components/DashboardSidebar/sidebar";
import useFetchOffers from "@/components/Forms/hooks/use-get-offers.hook";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
    const { offers } = useFetchOffers();
    const [offersCount, setOffersCount] = useState(0);
    const [hiringCount, setHiringCount] = useState(0);
    const [premiumUsersCount, setPremiumUsersCount] = useState(0);
    const [openOffersCount, setOpenOffersCount] = useState(0);
    const [closedOffersCount, setClosedOffersCount] = useState(0);

    const getHiringCount = async () => {
        const response = await fetch('https://localhost:7215/api/Hirings');
        const data = await response.json();
        setHiringCount(data.length);
    }

    const getPremiumUsersCount = async () => {
        try {
            const response = await fetch('https://localhost:7215/api/Users');

            if (response.ok) {
                const data = await response.json();
                const premiumUsers = data.filter((user: { userRole: number; }) => user.userRole === 2);
                setPremiumUsersCount(premiumUsers.length);
            } else {
                console.error('Error fetching users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    const getClosedAndOpenOffersCount = async () => {
        try {
            const response = await fetch('https://localhost:7215/api/Offers');

            if (response.ok) {
                const data = await response.json();
                const openOffers = data.filter((offer: { status: number; }) => offer.status === 0);
                const closedOffers = data.filter((offer: { status: number; }) => offer.status === 1);
                setClosedOffersCount(closedOffers.length);
                setOpenOffersCount(openOffers.length);
            } else {
                console.error('Error fetching users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


    useEffect(() => {
        try {
            setOffersCount(offers.length);
            getHiringCount();
            getPremiumUsersCount();
            getClosedAndOpenOffersCount();
        } catch (error) {
            console.error('Error fetching user offers:', error);
        }
    }, [offers])


    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/dashboard-light.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/dashboard-dark.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="hidden dark:block"
                />
            </div>
            <div className="hidden flex-col md:flex">
                <div className="flex flex-row">
                    <Sidebar />
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-lg font-medium">
                                        Total Created Offers
                                    </CardTitle>
                                    <Briefcase />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{offersCount}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +20.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">
                                        Subscriptions
                                    </CardTitle>
                                    <Users />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{premiumUsersCount}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +180.1% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">Hiring</CardTitle>
                                    <HeartHandshake />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{hiringCount}</div>
                                    <p className="text-xs text-muted-foreground">
                                        +19% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">Offers Open</CardTitle>
                                    <CheckCheck className="text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{openOffersCount}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">Offers Closed</CardTitle>
                                    <XCircle className="text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{closedOffersCount}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}