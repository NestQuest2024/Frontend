import { useEffect, useState } from 'react';

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

const useFetchOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);

  const fetchOffers = async () => {
    try {
      const offersResponse = await fetch('https://localhost:7215/api/Offers');

      if (offersResponse.ok) {
        const offersData: Offer[] = await offersResponse.json();
        setOffers(offersData);
      } else {
        console.error('Erro ao buscar ofertas:', offersResponse.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar ofertas:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Retorne a função fetchOffers para poder recarregar as ofertas.
  return { offers, fetchOffers };
};

export default useFetchOffers;
