import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';


const fetchCategories = async () => {
  const { data } = await axiosInstance.get('/categories/get');
  return data;
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};
