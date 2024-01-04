import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://localhost:7215/api/categories");
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchCategories();
  };

  return { categories, loading, refetch } as const;
};