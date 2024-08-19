// src/hooks/useDeleteOrder.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId) => {
      try {
        const { data } = await axiosInstance.delete(`/orders/${orderId}`);
        return data;
      } catch (error) {
        console.error('Error deleting order:', error.response?.data?.message || error.message);
        throw error; // Rethrow the error to trigger onError callback
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']); // Invalidate and refetch orders query
    },
    onError: (error) => {
      console.error('Error deleting order:', error.response?.data?.message || error.message);
    },
  });
};
