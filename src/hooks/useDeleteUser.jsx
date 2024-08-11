import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-hot-toast";

const deleteUser = async (userId) => {
  try {
    await axiosInstance.delete(`/users/${userId}`);
  } catch (error) {
    toast.error("Failed to delete user.");
    throw error;
  }
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser, // Object syntax: function as `mutationFn`
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully.");
    },
  });
};
