import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


export const useFetchProductData = (id) => {
  const fetchProduct = async () => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  };

  const fetchCategoriesAndBrands = async () => {
    const [categoriesResponse, brandsResponse] = await Promise.all([
      axiosInstance.get("/categories/get"),
      axiosInstance.get("/brands"),
    ]);
    return {
      categories: categoriesResponse.data,
      brands: brandsResponse.data,
    };
  };

  const productQuery = useQuery(["product", id], fetchProduct);
  const categoriesAndBrandsQuery = useQuery(
    ["categoriesAndBrands"],
    fetchCategoriesAndBrands
  );

  return { productQuery, categoriesAndBrandsQuery };
};
