import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

import { toast } from 'react-hot-toast';

// Fetch brands
const fetchBrands = async () => {
  const { data } = await axiosInstance.get('/brands/get');
  return data;
};

// Update brand
const updateBrand = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(`/brands/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Delete brand
const deleteBrand = async (id) => {
  await axiosInstance.delete(`/brands/${id}`);
};

export const useBrandsManager = () => {
  const queryClient = useQueryClient();

  // Use object syntax for useQuery
  const brandsQuery = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  // Use object syntax for useMutation
  const updateBrandMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(['brands']);
      toast.success('Brand updated successfully');
    },
    onError: () => {
      toast.error('Failed to update brand');
    },
  });

  const deleteBrandMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries(['brands']);
      toast.success('Brand deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete brand');
    },
  });

  return {
    brands: brandsQuery.data || [],
    fetchError: brandsQuery.error,
    isLoading: brandsQuery.isLoading,
    mutateUpdateBrand: updateBrandMutation.mutate,
    mutateDeleteBrand: deleteBrandMutation.mutate,
  };
};
