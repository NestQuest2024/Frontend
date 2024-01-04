'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { JobPage } from '@/components/jobPage/jobPage';

interface User {
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
    createdAt: string;
}

interface PageProps {
  offerDetail: OfferDetail | null;
}

const JobPageDetail: NextPage<PageProps> = ({ offerDetail }) => {
  if (!offerDetail) {
    return <p>Carregando...</p>;
  }

  return (
    <JobPage offerDetail={offerDetail}/>
  );
};

const JobPageDetailWrapper = ({ offerDetail }: PageProps) => {
  const [localOfferDetail, setLocalOfferDetail] = useState<OfferDetail | null>(offerDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = window.location.pathname.split('/').pop();
        const response = await fetch(`https://localhost:7215/api/offers/${id}`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setLocalOfferDetail(data);
        } else {
          console.error('Failed to fetch offer details');
        }
      } catch (error) {
        console.error('Error fetching offer details:', error);
      }
    };

    if (!localOfferDetail) {
      fetchData();
    }
  }, [localOfferDetail]);

  return <JobPageDetail offerDetail={localOfferDetail} />;
};

export default JobPageDetailWrapper;