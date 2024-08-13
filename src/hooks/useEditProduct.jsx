import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useEditProduct = (productId) => {
  const queryClient = useQueryClient();

  // Function to fetch the product details
  const fetchProduct = async () => {
    const { data } = await axiosInstance.get(`/products/${productId}`);
    return data.product;
  };

  // useQuery to get the product details
  const {
    data: product,
    isLoading: isFetchingProduct,
    error: fetchError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
  });

  // Function to update the product details with images
  const updateProduct = async (updatedData) => {
    const response = await axiosInstance.put(
      `/products/${productId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.product;
  };

  // useMutation to handle the update operation
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Invalidate the product query to refetch the updated data
      queryClient.invalidateQueries(["product", productId]);
    },
    onError: (error) => {
      console.error("Error updating the product:", error);
    },
  });

  return {
    product,
    isFetchingProduct,
    fetchError,
    updateProduct: mutation.mutate,
    isUpdatingProduct: mutation.isLoading,
    updateError: mutation.error,
  };
};
