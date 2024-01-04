'use client';
import PasswordReset from '@/components/passwordReset/passwordReset';
import { useEffect, useState } from 'react';

const PasswordResetPage = () => {
  const [resetData, setResetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userId, token] = window.location.pathname.split('/').slice(-2);
        const response = await fetch(`https://localhost:7215/api/Users/passwordReset/${userId}/${token}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setResetData(data);
        } else {
          console.error('Failed to fetch password reset details');
        }
      } catch (error) {
        console.error('Error fetching password reset details:', error);
      }
    };

    if (!resetData) {
      fetchData();
    }
  }, [resetData]);

  return (
    <PasswordReset />
  );
};

export default PasswordResetPage;