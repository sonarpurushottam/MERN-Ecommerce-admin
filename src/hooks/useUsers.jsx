import { useQuery } from "@tanstack/react-query";
import axiosInstance from '../api/axiosInstance';

import { toast } from "react-hot-toast";

const fetchUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  } catch (error) {
    toast.error("Failed to fetch users.");
    throw error;
  }
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"], // Object syntax: key as `queryKey`
    queryFn: fetchUsers, // Object syntax: function as `queryFn`
    staleTime: 60000, // Cache data for 1 minute
    refetchOnWindowFocus: false, // Optional: Refetch data when the window is focused
  });
};
