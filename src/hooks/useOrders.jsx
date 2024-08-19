import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useOrders = (filters) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/orders", { params: filters });
      return data;
    },
  });
};

export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/orders/${orderId}`);
      return data;
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      const { data } = await axiosInstance.put(`/orders/${orderId}`, {
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId) => {
      await axiosInstance.delete(`/orders/${orderId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });
};
// Custom hook for deleting an order
// export const useDeleteOrder = () => {
//   return useMutation({
//     mutationFn: async (orderId) => {
//       const { data } = await axiosInstance.delete(`/orders/${orderId}`);
//       return data;
//     },
//     onError: (error) => {
//       console.error('Error deleting order:', error.response?.data?.message || error.message);
//     },
//     onSuccess: () => {
//       // Optionally handle any success logic here, like invalidating queries
//       console.log('Order deleted successfully');
//     },
//   });
// };
