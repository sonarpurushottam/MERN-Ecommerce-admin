// hooks/useUpdateProduct.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from "../api/axiosInstance";


const updateProduct = async (formData) => {
  const { data } = await axiosInstance.put(`/products/${formData.get('id')}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['product']);
      queryClient.invalidateQueries(['products-list']);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
    },
  });
};
