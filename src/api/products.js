// src/api/products.js

import axiosInstance from "./axiosInstance";

// Fetch all products
export const fetchProducts = async () => {
  const response = await axiosInstance.get("/products/all-products");
  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  await axiosInstance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data.product;
};

// Update a product
export const updateProduct = async ({ id, formData }) => {
  const token = localStorage.getItem("token");
  await axiosInstance.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};


