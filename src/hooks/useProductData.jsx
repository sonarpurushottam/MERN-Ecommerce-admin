// hooks/useProductData.js
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../api/axiosInstance";


const fetchProduct = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};

const fetchCategoriesAndBrands = async () => {
  const [categoriesResponse, brandsResponse] = await Promise.all([
    axiosInstance.get('/categories/get'),
    axiosInstance.get('/brands'),
  ]);
  return {
    categories: categoriesResponse.data,
    brands: brandsResponse.data,
  };
};

export const useProductData = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });
};

export const useCategoriesAndBrands = () => {
  return useQuery({
    queryKey: ['categoriesAndBrands'],
    queryFn: fetchCategoriesAndBrands,
  });
};
