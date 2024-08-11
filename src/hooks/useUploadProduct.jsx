import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useUploadProduct = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.post("/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Upload error:", error.response?.data || error.message);
    },
  });
};
