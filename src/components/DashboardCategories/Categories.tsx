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
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { useGetCategories } from "@/components/Forms/hooks/use-get-categories.hook";
import Modal from 'react-modal';
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
    id: number;
    name: string;
}

export default function Categories() {
    const { categories, loading, refetch } = useGetCategories();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [editedCategoryId, setEditedCategoryId] = useState(0);
    const [updatedCategoryName, setUpdatedCategoryName] = useState("");

    const openEditModal = ({ id, name }: Category) => {
        setEditedCategoryId(id);
        setUpdatedCategoryName(name);
        setUpdateModalOpen(true);
    };

    const closeEditModal = () => {
        setUpdateModalOpen(false);
        setEditedCategoryId(0);
        setUpdatedCategoryName("");
    };

    const handleUpdateCategory = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://localhost:7215/api/categories/${editedCategoryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: editedCategoryId, name: updatedCategoryName }),
            });

            if (response.ok) {
                toast.success("Category updated successfully");
                closeEditModal();
                refetch();
            } else {
                toast.error("Failed to update category");
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            const response = await fetch(`https://localhost:7215/api/categories/${id}/offers`);
            console.log(response);
            const associatedOffers = await response.json();

            if (associatedOffers.length > 0) {
                toast.error("Cannot delete category with associated offers");
            } else {
                const deleteResponse = await fetch(`https://localhost:7215/api/categories/${id}`, {
                    method: "DELETE",
                });

                if (deleteResponse.ok) {
                    toast.success("Category deleted successfully");
                    refetch();
                } else {
                    toast.error("Failed to delete category");
                }
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleCreateCategory = async () => {
        try {
            const response = await fetch("https://localhost:7215/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newCategoryName }),
            });

            if (response.ok) {
                toast.success("Category created successfully");
                closeModal();
                refetch();
            } else {
                toast.error("Failed to create category");
            }
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const customModalStyles = {
        content: {
            width: '20%',
            maxHeight: '20%',
            margin: 'auto',
        },
    };

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex flex-row">
                    <Sidebar />
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
                            <Button size="md" icon={Plus} color="blue" onClick={openModal}>
                                New Category
                            </Button>
                        </div>
                        <div className="grid gap-4">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Id</TableHeaderCell>
                                        <TableHeaderCell>Category</TableHeaderCell>
                                        <TableHeaderCell>Edit</TableHeaderCell>
                                        <TableHeaderCell>Delete</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories.map((item: Category) => (
                                        <TableRow key={item.id.toString()}>
                                            <TableCell>{item.id.toString()}</TableCell>
                                            <TableCell>
                                                <Text>{item.name}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" color="blue" icon={PencilLine} onClick={() => openEditModal({ id: item.id, name: item.name })}>Edit</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm" color="red" icon={Trash2} onClick={() => handleDeleteCategory(item.id.toString())}>
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
            </div >
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Create Category Modal"
                style={customModalStyles}
                className="modal fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md backdrop-filter backdrop-blur-md"
            >
                <div className="modal-content max-w-xs mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full p-2 border border-gray-300 mb-4 rounded"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleCreateCategory}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 cursor-pointer transition-colors duration-300"
                        >
                            Create Category
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer transition-colors duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Category Modal"
                style={customModalStyles}
                className="modal fixed inset-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md backdrop-filter backdrop-blur-md"
            >
                <div className="modal-content max-w-xs mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
                    <input
                        type="text"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        className="w-full p-2 border border-gray-300 mb-4 rounded"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handleUpdateCategory}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 cursor-pointer transition-colors duration-300" // Adiciona estilos de hover
                        >
                            Update Category
                        </button>
                        <button
                            onClick={closeEditModal}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer transition-colors duration-300" // Adiciona estilos de hover
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
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