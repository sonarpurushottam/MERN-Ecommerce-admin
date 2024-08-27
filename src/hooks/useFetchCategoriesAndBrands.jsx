import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories/get");
  return response.data;
};

const fetchBrandsByCategory = async (categoryId) => {
  const response = await axiosInstance.get(
    `/brands/getByCategory/${categoryId}`
  );
  return response.data;
};

export const useFetchCategoriesAndBrands = (selectedCategoryId) => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const brandsQuery = useQuery({
    queryKey: ["brands", selectedCategoryId],
    queryFn: () => fetchBrandsByCategory(selectedCategoryId),
    enabled: !!selectedCategoryId, // Fetch brands only if a category is selected
  });

  return {
    categoriesQuery,
    brandsQuery,
  };
};
