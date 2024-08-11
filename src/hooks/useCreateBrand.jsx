import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

const createBrand = async (formData) => {
  await axiosInstance.post('/brands/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: createBrand,
    onError: (error) => {
      console.error('Error creating brand', error);
    },
    onSuccess: () => {
      // Handle success (e.g., redirect or show a success message)
    },
  });
};
