import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get("/users/profile");
  return data;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"], // key to identify the query
    queryFn: fetchUserProfile, // function to fetch data
    staleTime: 60000, // Adjust the stale time as needed
  });
};
