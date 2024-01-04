'use client';

import { Searchbar } from "@/components/searchbar/searchbar";
import { OfferCard } from "@/components/OfferCard";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/authContext";
import useFetchOffers from "@/components/Forms/hooks/use-get-offers.hook";
import { useGetCategories } from "@/components/Forms/hooks/use-get-categories.hook";
import { CategorySelect } from "@/components/CategorySelect/CategorySelect";
import { WorkPlaceSelect } from "@/components/WorkPlaceSelect/WorkPlaceSelect";
import { Button } from "../../components/ui/button";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function Page() {

    const { getUserInfo } = useContext(Context);
    const { offers } = useFetchOffers();
    const { categories } = useGetCategories();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedWorkPlace, setSelectedWorkPlace] = useState<number | null>(null);
    const [searchResults, setSearchResults] = useState<Offer[]>([]);
    const [resetSelects, setResetSelects] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);

    const handleSelectWorkPlace = (selectedWorkPlace: number) => {
        setSelectedWorkPlace(selectedWorkPlace);
    };

    const handleClearSelections = () => {
        setSelectedCategory(null);
        setSelectedWorkPlace(null);
        setResetSelects(true);

        setTimeout(() => {
            setResetSelects(false);
        }, 100);
    };

    const handleSearch = async (query: string) => {
        try {
            if (!query && !selectedCategory && selectedWorkPlace === null) {
                setSearchResults(offers);
                return offers;
              }
            setSearchResults([]);

            const categoryParam = selectedCategory ? `&categoryId=${selectedCategory}` : '';
            const placeParam = selectedWorkPlace !== null ? `&placeId=${String(selectedWorkPlace)}` : '';

            const response = await fetch(`https://localhost:7215/api/Offers/filter?query=${query}${categoryParam}${placeParam}`);
            const data = await response.json();

            if (!response.ok) {
                console.error("Error in API response:", response.statusText);
            }
            setSearchResults(Array.isArray(data) && data.length > 0 ? data : []);
            return data;
        } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
            return [];
        }
    };

    const removeSearch = () => {
        setSearchResults([]);
        handleSearch("");
    };

    useEffect(() => {
        getUserInfo()
                .then((userInfoResponse: any) => {
                    setUserInfo(userInfoResponse.userInfo);
                })
                .catch((error: any) => {
                    console.error('Error fetching user information:', error);
                });
        setSearchResults(offers);
    }, [offers]);

    return (
        <>
            <div className="p-4">
                <div>
                    <Searchbar onSearch={handleSearch} removeSearch={removeSearch} />
                </div>
                <div className="p-2 flex flex-row gap-4">
                    <CategorySelect
                        key={`category-select-${resetSelects}`}
                        categories={categories}
                        onSelectCategory={setSelectedCategory}
                        reset={resetSelects}
                    />
                    <WorkPlaceSelect
                        key={`workplace-select-${resetSelects}`}
                        onSelectWorkPlace={handleSelectWorkPlace}
                        reset={resetSelects}
                    />
                    <Button
                        onClick={handleClearSelections}
                        variant={'outline'}
                        className="hover:bg-blue-200 border-gray-300 border bg-blue-100"
                    >
                        Clear Selections
                    </Button>
                </div>
                {searchResults.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchResults.map((offer) => (
                            <OfferCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                )}
                {searchResults.length === 0 && (
                    <div>
                        There are no services with these characteristics.
                    </div>
                )}
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
    );
}
