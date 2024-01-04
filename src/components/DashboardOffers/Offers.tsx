'use client';

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
} from "@tremor/react";

import Sidebar from "@/components/DashboardSidebar/sidebar";
import useFetchOffers from "../Forms/hooks/use-get-offers.hook";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import Link from 'next/link';

interface User {
    firsName: string;
    lastName: string;
}

interface Offer {
    id: number;
    title: string;
    description: string;
    price: number;
    offerTimeUnitName: string;
    createdBy: User;
}

export default function Offers() {
    const { offers, fetchOffers } = useFetchOffers();

    const handleDeleteOffer = async (id: number) => {
        try {
            const response = await fetch(`https://localhost:7215/api/Offers/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Offer Deleted Successfully!');
                fetchOffers();
            } else {
                toast.error('Error Deleting Offer!');
            }
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    useEffect(() => {

    }, [offers]);

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex flex-row">
                    <Sidebar />
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Offers</h2>
                            <span className="text-sm">Click on user data to go to offer detailed page!</span>
                        </div>
                        <div className="grid gap-4">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Id</TableHeaderCell>
                                        <TableHeaderCell>Created By</TableHeaderCell>
                                        <TableHeaderCell>Title</TableHeaderCell>
                                        <TableHeaderCell>Description</TableHeaderCell>
                                        <TableHeaderCell>Price</TableHeaderCell>
                                        <TableHeaderCell>Delete</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {offers.map((item: Offer) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Link href={`/jobPage/${item.id}`}>
                                                    {item.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/jobPage/${item.id}`}>
                                                    <Text>{item.createdBy.firsName} {item.createdBy.lastName}</Text>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/jobPage/${item.id}`}>
                                                    <Text>{item.title}</Text>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/jobPage/${item.id}`}>
                                                    <Text>{item.description && item.description.length > 60 ? `${item.description.slice(0, 60)}...` : item.description}</Text>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/jobPage/${item.id}`}>
                                                    <Text>{item.price}€/{item.offerTimeUnitName}</Text>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" color="red" icon={Trash2} onClick={() => handleDeleteOffer(item.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
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