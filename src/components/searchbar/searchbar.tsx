'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface SearchbarProps {
  onSearch: (query: string) => Promise<Offer[]>;
  removeSearch: () => void; // Adiciona a nova prop
}

export function Searchbar({ onSearch, removeSearch }: SearchbarProps): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Offer[]>([]);

  const handleSearch = async () => {
    try {
      const results = await onSearch(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const removeSearchLocal = () => {
    setSearchQuery("");
    setSearchResults([]);
    removeSearch(); // Chama a função fornecida via prop para remover a pesquisa no componente pai
  };

  return (
    <div>
      <div className="flex gap-2 p-2">
        <Input
          placeholder="Search..."
          className="text-gray-300 text-sm rounded-2xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline" className="bg-blue-100 rounded-2xl border-gray-300 border hover:bg-blue-200" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outline" className="bg-red-100 rounded-2xl border-gray-300 border hover:bg-red-200" onClick={removeSearchLocal}>
          Remove Search
        </Button>
      </div>
    </div>
  );
}
