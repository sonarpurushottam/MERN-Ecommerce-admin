import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data: categories, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/categories/get');
      return data;
    },
  });

  // Helper function to create FormData
  const createFormData = (category) => {
    const formData = new FormData();
    formData.append('name', category.name);
    if (category.image) {
      formData.append('image', category.image);
    }
    return formData;
  };

  const addCategory = useMutation({
    mutationFn: (newCategory) => {
      const formData = createFormData(newCategory);
      return axiosInstance.post('/categories/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['categories']),
  });

  const editCategory = useMutation({
    mutationFn: (updatedCategory) => {
      const formData = createFormData(updatedCategory);
      return axiosInstance.put(`/categories/${updatedCategory.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    onSuccess: () => queryClient.invalidateQueries(['categories']),
  });

  const deleteCategory = useMutation({
    mutationFn: (categoryId) => axiosInstance.delete(`/categories/${categoryId}`),
    onSuccess: () => queryClient.invalidateQueries(['categories']),
  });

  return { categories, error, isLoading, addCategory, editCategory, deleteCategory };
};
