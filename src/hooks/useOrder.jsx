
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useOrder = () => {
  const queryClient = useQueryClient();

  const getOrders = ({ page = 1, limit = 10, startDate, endDate } = {}) =>
    useQuery({
      queryKey: ["orders", { page, limit, startDate, endDate }],
      queryFn: async () => {
        const { data } = await axiosInstance.get("/orders", {
          params: { page, limit, startDate, endDate },
        });
        return data;
      },
    });

  const getOrderById = (orderId) =>
    useQuery({
      queryKey: ["order", orderId],
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
        queryClient.invalidateQueries(["orders"]);
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
        queryClient.invalidateQueries(["orders"]);
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
        queryClient.invalidateQueries(["orders"]);
        toast.success("Order deleted successfully");
      },
      onError: () => {
        toast.error("Error deleting order");
      },
    });

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
