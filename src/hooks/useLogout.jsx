import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

import { toast } from "react-hot-toast";

const logout = async () => {
  await axiosInstance.post("/users/logout");
  localStorage.removeItem("token"); // Remove token from localStorage
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout, // function to perform the mutation
    onSuccess: () => {
      toast.success("Logged out successfully");
      window.location.href = "/"; // Redirect to login page
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
};
