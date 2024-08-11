import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

// Fetch categories
const fetchCategories = async () => {
  const { data } = await axiosInstance.get('/categories/get');
  return data;
};

// Add category
const addCategory = async (formData) => {
  const { data } = await axiosInstance.post('/categories/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Update category
const updateCategory = async ({ id, formData }) => {
  const { data } = await axiosInstance.put(`/categories/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Delete category
const deleteCategory = async (id) => {
  await axiosInstance.delete(`/categories/${id}`);
};

export const useCategoriesManager = () => {
  const queryClient = useQueryClient();

  // Use object syntax for useQuery
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Use object syntax for useMutation
  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Category added successfully');
    },
    onError: () => {
      toast.error('Failed to add category');
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Category updated successfully');
    },
    onError: () => {
      toast.error('Failed to update category');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Category deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete category');
    },
  });

  return {
    categories: categoriesQuery.data || [],
    fetchError: categoriesQuery.error,
    isLoading: categoriesQuery.isLoading,
    addCategory: addCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
  };
};
