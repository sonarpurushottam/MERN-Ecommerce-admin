import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchUserProfile,
  updateUserProfile,
  logoutUser,
} from "../api/userApi";

// Custom hook to fetch user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
};

// Custom hook to update user profile
export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: updateUserProfile,
  });
};

// Custom hook to logout user
export const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
