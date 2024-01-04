import { useEffect, useState } from "react";

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
}

interface FetchUserOffersResult {
  userOffers: Offer[];
  fetchOffersByUser: () => void;
}

const useFetchUserOffers = (userId: number): FetchUserOffersResult => {
  const [userOffers, setUserOffers] = useState<Offer[]>([]);

  const fetchOffersByUser = async () => {
    try {
      const userOffersResponse = await fetch(`https://localhost:7215/api/Users/${userId}/Offers`);

      if (userOffersResponse.ok) {
        const userOffersData: Offer[] = await userOffersResponse.json();
        setUserOffers(userOffersData);
        return userOffersData;
      } else {
        console.error('Erro ao buscar ofertas do usuário:', userOffersResponse.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar ofertas do usuário:', error);
    }
  };

  useEffect(() => {
    fetchOffersByUser();
  }, [userId]);

  return { userOffers, fetchOffersByUser };
};



export default useFetchUserOffers;
