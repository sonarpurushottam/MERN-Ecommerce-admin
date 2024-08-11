import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';


const fetchCategoriesAndBrands = async () => {
  const [categoriesResponse, brandsResponse] = await Promise.all([
    axiosInstance.get('/categories/get'),
    axiosInstance.get('/brands/get'),
  ]);
  return {
    categories: categoriesResponse.data,
    brands: brandsResponse.data,
  };
};

export const useFetchCategoriesAndBrands = () => {
  return useQuery({
    queryKey: ['categoriesAndBrands'],
    queryFn: fetchCategoriesAndBrands,
  });
};
