import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { useProducts } from "../hooks/useProducts";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct, isUpdating } = useProducts();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setSellingPrice(product.sellingPrice || "");
      setProductImages(product.productImage || []);
    }
  }, [product]);

  const handleImageChange = (event) => {
    setNewImages(event.target.files);
  };
  const handleRemoveImage = (index, isExistingImage = false) => {
    if (isExistingImage) {
      setProductImages(productImages.filter((_, i) => i !== index));
    } else {
      setNewImages(newImages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("sellingPrice", sellingPrice);

    productImages.forEach((image) => {
      formData.append("existingImages", image);
    });

    for (let i = 0; i < newImages.length; i++) {
      formData.append("newImages", newImages[i]);
    }

    updateProduct(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          navigate("/products-list");
        },
        onError: () => {
          toast.error("Failed to update product.");
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500">Error loading product.</div>
    );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Name:</label>
            <input
              type="text"
              value={productName || ""}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description:</label>
            <textarea
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Price:</label>
            <input
              type="number"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Existing Images:</label>
            <div className="flex flex-wrap gap-2">
              {productImages.map((image, index) => (
                <div key={index} className="relative">
                  <motion.img
                    src={image}
                    alt="Product"
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, true)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium">New Images:</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from(newImages).map((file, index) => (
                <div key={index} className="relative">
                  <motion.img
                    src={URL.createObjectURL(file)}
                    alt="New Product"
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
          {isUpdating && (
            <div className="flex justify-center mt-4">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default EditProduct;
