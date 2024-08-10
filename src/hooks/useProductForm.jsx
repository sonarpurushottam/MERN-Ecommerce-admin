import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductById, updateProduct } from "../api/products";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useProductForm = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (formData) => updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["product", id]);
      toast.success("Product updated successfully!");
      navigate("/products-list");
    },
    onError: () => {
      toast.error("Failed to update product.");
    },
  });

  const handleImageChange = (event) => {
    // Handle image change logic if needed
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (product) {
      const formData = new FormData();
      formData.append("productName", event.target.productName.value);
      formData.append("description", event.target.description.value);
      formData.append("price", event.target.price.value);

      for (const image of product.productImage) {
        formData.append("existingImages", image);
      }

      const newImages = event.target.newImages.files;
      for (const image of newImages) {
        formData.append("newImages", image);
      }

      try {
        await mutation.mutateAsync(formData);
      } catch (error) {
        // Error handling is done in onError callback
      }
    }
  };

  return {
    product,
    isLoading,
    isError,
    handleImageChange,
    handleSubmit,
    isUpdating: mutation.isLoading,
  };
};
