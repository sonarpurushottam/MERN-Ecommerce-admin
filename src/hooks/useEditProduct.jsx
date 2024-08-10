import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProductById, updateProduct } from "../api/products";
import { useState } from "react";

export const useProduct = (id) => {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const { mutate: updateProductMutation, isLoading: isUpdating } = useMutation({
    mutationFn: (formData) => updateProduct({ id, formData }),
    onError: (error) => {
      console.error("Error updating product:", error);
      // Optionally, you can use a notification library here
    },
    onSuccess: () => {
      // Handle successful update (e.g., show a success message or navigate)
    },
  });

  // Form state and handlers
  const [productName, setProductName] = useState(product?.productName || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [newImages, setNewImages] = useState([]);

  const handleImageChange = (event) => {
    // Handle image file changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);

    newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    try {
      await updateProductMutation(formData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return {
    product,
    isLoading,
    isError,
    productName,
    setProductName,
    description,
    setDescription,
    price,
    setPrice,
    newImages,
    handleImageChange,
    handleSubmit,
    isUpdating,
  };
};
