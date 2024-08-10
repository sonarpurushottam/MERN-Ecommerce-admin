// // src/hooks/useProducts.js
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { fetchProducts, deleteProduct } from "../api/products";
// import { toast } from "react-hot-toast";

// export const useProducts = () => {
//   const queryClient = useQueryClient();

//   // Fetch products query
//   const productsQuery = useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//   });

//   // Delete product mutation
//   const deleteProductMutation = useMutation({
//     mutationFn: deleteProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["products"]);
//       toast.success("Product deleted successfully!");
//     },
//     onError: () => {
//       toast.error("Failed to delete product.");
//     },
//   });

//   return {
//     products: productsQuery.data,
//     isLoading: productsQuery.isLoading,
//     isError: productsQuery.isError,
//     deleteProduct: deleteProductMutation.mutate,
//   };
// };

// src/hooks/useProducts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, deleteProduct, updateProduct } from '../api/products';
import { toast } from 'react-hot-toast';

// Custom hook for managing products
export const useProducts = () => {
  const queryClient = useQueryClient();

  // Fetch all products query
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete product.');
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, formData }) => updateProduct({ id, formData }),
    onSuccess: (id) => {
      queryClient.invalidateQueries(['product', id]); // Refresh the product data
      toast.success('Product updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update product.');
    },
  });

  return {
    products: productsQuery.data,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    deleteProduct: deleteProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    isUpdating: updateProductMutation.isLoading,
  };
};
