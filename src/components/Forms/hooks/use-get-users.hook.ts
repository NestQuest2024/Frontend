'use client';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7215/api/Users');

        if (!response.ok) {
          throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return { users };
}

interface UpdateUserRoleParams {
  id: number;
  userRole: number;
}

export const useUpdateUserRole = () => {
  const [error, setError] = useState<string | null>(null);

  const updateUserRole = async ({ userRole, id }: UpdateUserRoleParams) => {
    try {
      const response = await fetch(`https://localhost:7215/api/Users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( userRole ),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user role. Status: ${response.status}`);
      }
      toast.success('User role updated successfully.');
      setError(null);
    } catch (error) {
      toast.error('Failed to update user role. Please try again.');
      setError("Failed to update user role. Please try again.");
    }
  };

  return { updateUserRole, error };
};
