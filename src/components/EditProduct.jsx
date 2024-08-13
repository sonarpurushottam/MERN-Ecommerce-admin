import React, { useState, useEffect } from "react";
import { useEditProduct } from "../hooks/useEditProduct";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isFetchingProduct, updateProduct, isUpdatingProduct } =
    useEditProduct(id);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    newImages: [],
    oldImages: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        price: product.price,
        newImages: [],
        oldImages: product.productImage || [], // Ensure product.productImage contains valid URLs
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Use a Set to keep track of unique files
    const existingImages = new Set(
      formData.newImages.map((file) => `${file.name}-${file.size}`)
    );

    const newImages = files.filter(
      (file) => !existingImages.has(`${file.name}-${file.size}`)
    );

    // Update state with new images
    setFormData((prevState) => ({
      ...prevState,
      newImages: [...prevState.newImages, ...newImages],
    }));

    // Clear the input file selection
    e.target.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "newImages") {
        formData.newImages.forEach((image) =>
          updatedData.append("newImages", image)
        );
      } else if (key === "oldImages") {
        formData.oldImages.forEach((imageUrl) =>
          updatedData.append("oldImages", imageUrl)
        );
      } else {
        updatedData.append(key, formData[key]);
      }
    });

    updateProduct(updatedData, {
      onSuccess: () => {
        toast.success("Product updated successfully!");
        navigate("/products-list");
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      {isFetchingProduct ? (
        <div className="flex justify-center items-center h-full">
          <FaSpinner className="animate-spin text-blue-500" size={48} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>

          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* <div>
            <label className="block text-gray-600">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div> */}

          {/* <div>
            <label className="block text-gray-600">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div> */}

          <div>
            <label className="block text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-600">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-600">Upload New Images</label>
            <input
              type="file"
              name="newImages"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Section for old images */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Existing Images
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {formData.oldImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Old Product ${index}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section for new images */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700">New Images</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {formData.newImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New Product ${index}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600"
            disabled={isUpdatingProduct}
          >
            {isUpdatingProduct ? "Updating..." : "Update Product"}
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default EditProduct;
