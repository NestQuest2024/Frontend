'use client';
import Sidebar from "../DashboardSidebar/sidebar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
} from "@tremor/react";
import { useFetchUsers, useUpdateUserRole } from "../Forms/hooks/use-get-users.hook";
import MySelect from "../MySelect/MySelect";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/authContext";

interface User {
    id: number;
    email: string;
    password: string
    firsName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    classification: string;
    longDescription: string;
    shortDescription: string;
    avatar: string;
    userType: string;
    userRole: number;
    birthdate: string;
    createdAt: string;
}

export default function Users() {
    const { users } = useFetchUsers();
    const { updateUserRole, error: updateUserRoleError } = useUpdateUserRole();
    const [userInfo, setUserInfo] = useState<any>(null);
    const { getUserInfo, signOut } = useContext(Context);

    const handleSelectChange = (value: number, id: number ) => {
        updateUserRole({ id, userRole: value });
        if (id === userInfo.id) {
            signOut();
            window.location.href = '/auth/sign-in';
        }
    };

    useEffect(() => {
        getUserInfo()
            .then((userInfoResponse: any) => {
                setUserInfo(userInfoResponse.userInfo);
            })
            .catch((error: any) => {
                console.error('Error fetching user information:', error);
            });
    }, []);

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex flex-row">
                    <Sidebar />
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                        </div>
                        <div className="grid gap-4">
                            <Table className="w-full h-screen">
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Id</TableHeaderCell>
                                        <TableHeaderCell>Name</TableHeaderCell>
                                        <TableHeaderCell>Email</TableHeaderCell>
                                        <TableHeaderCell>Phone</TableHeaderCell>
                                        <TableHeaderCell>Role</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((item: User) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>
                                                <Text>{item.firsName} {item.lastName}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item.email}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Text>{item.phoneNumber}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <MySelect
                                                    options={[
                                                        { label: "Default", value: 0 },
                                                        { label: "Nest", value: 1 },
                                                        { label: "Premium", value: 2 },
                                                        { label: "Administrator", value: 3 },
                                                    ]}
                                                    onChange={(value: number) => handleSelectChange(value, item.id)}
                                                    placeholder={item.userType}
                                                    userId={item.id}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div >
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
