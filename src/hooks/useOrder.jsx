import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useOrder = () => {
  const queryClient = useQueryClient();

  const getOrders = () =>
    useQuery({
      queryKey: ["orders"], // Unique identifier for the orders query
      queryFn: async () => {
        const { data } = await axiosInstance.get("/orders");
        return data;
      },
    });

  const getOrderById = (orderId) =>
    useQuery({
      queryKey: ["order", orderId], // Unique identifier for a single order query
      queryFn: async () => {
        const { data } = await axiosInstance.get(`/orders/${orderId}`);
        return data;
      },
    });

  const createOrder = () =>
    useMutation({
      mutationFn: async (orderData) => {
        const { data } = await axiosInstance.post("/orders", orderData);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]); // Invalidate the orders query to refetch
        toast.success("Order created successfully");
      },
      onError: () => {
        toast.error("Error creating order");
      },
    });

  const updateOrderStatus = () =>
    useMutation({
      mutationFn: async ({ orderId, status }) => {
        const { data } = await axiosInstance.put(`/orders/${orderId}`, {
          status,
        });
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]); // Invalidate the orders query to refetch
        toast.success("Order status updated");
      },
      onError: () => {
        toast.error("Error updating order status");
      },
    });

  const deleteOrder = () =>
    useMutation({
      mutationFn: async (orderId) => {
        await axiosInstance.delete(`/orders/${orderId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]); // Invalidate the orders query to refetch
        toast.success("Order deleted successfully");
      },
      onError: () => {
        toast.error("Error deleting order");
      },
    });
  // Fetch orders by user email or username
  const getOrdersByUserEmailOrName = (emailOrName) =>
    useQuery({
      queryKey: ["orders", emailOrName],
      queryFn: async () => {
        const { data } = await axiosInstance.get(`/orders/user/${emailOrName}`);
        return data;
      },
    });

  return {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getOrdersByUserEmailOrName,
  };
};
