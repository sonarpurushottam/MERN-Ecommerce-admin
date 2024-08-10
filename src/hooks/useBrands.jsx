import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export const useBrands = (categoryId) => {
  const queryClient = useQueryClient();

  const { data: brands, error, isLoading } = useQuery({
    queryKey: ['brands', categoryId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/brands?categoryId=${categoryId}`);
      return data;
    },
    enabled: !!categoryId,
  });

  const addBrand = useMutation({
    mutationFn: (newBrand) => axiosInstance.post('/brands', newBrand),
    onSuccess: () => queryClient.invalidateQueries(['brands', categoryId]),
  });

  const editBrand = useMutation({
    mutationFn: (updatedBrand) => axiosInstance.put(`/brands/${updatedBrand.id}`, updatedBrand),
    onSuccess: () => queryClient.invalidateQueries(['brands', categoryId]),
  });

  const deleteBrand = useMutation({
    mutationFn: (brandId) => axiosInstance.delete(`/brands/${brandId}`),
    onSuccess: () => queryClient.invalidateQueries(['brands', categoryId]),
  });

  return { brands, error, isLoading, addBrand, editBrand, deleteBrand };
};
