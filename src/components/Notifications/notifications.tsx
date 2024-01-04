'use client';
import useGetNotifications from "@/components/Forms/hooks/use-get-hirings.hook";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/authContext";

export default function Notifications() {
    const { isAuthenticated: auth, getUserInfo } = useContext(Context);
    const [notifications, setNotifications] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (auth) {
                    const userInfoResponse = await getUserInfo();
                    const fetchedNotifications = await useGetNotifications(userInfoResponse.userInfo.id);

                    const notificationsWithDetails = await Promise.all(
                        fetchedNotifications.map(async (notification:any) => {

                            const offerResponse = await fetch(`https://localhost:7215/api/offers/${notification.offerId}`);
                            const offerData = await offerResponse.json();

                            const userResponse = await fetch(`https://localhost:7215/api/users/${notification.userId}`);
                            const userData = await userResponse.json();

                            return {
                                ...notification,
                                offer: offerData,
                                user: userData,
                            };
                        })
                    );

                    setNotifications(notificationsWithDetails);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchData();
    }, [auth]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-4">Notifications</h1>
            {notifications && notifications.map((notification: any) => (
                <div key={notification.id} className="bg-white p-4 mb-4 border rounded shadow">
                    <p className="text-lg font-bold">Notification #{notification.id}</p>
                    <p>
                        User <span className="font-medium">{notification.user.firsName} {notification.user.lastName}</span> hired your offer
                        <span className="font-medium"> {notification.offer.title}</span>
                    </p>
                    <p>
                        Contact him to deliver your service:
                        <a href={`https://api.whatsapp.com/send?phone=${notification.user.phoneNumber}`} className="text-blue-500 ml-1">{notification.user.phoneNumber}</a>
                    </p>
                    <p>
                        Customer Email: <a href={`mailto:${notification.user.email}`} className="text-blue-500">{notification.user.email}</a>
                    </p>
                    <p>Hired at <span className="font-medium">{formatDate(notification.createdAt)}</span></p>
                </div>
            ))}
        </div>
    );
}