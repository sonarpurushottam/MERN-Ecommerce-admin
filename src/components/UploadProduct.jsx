import { useState } from "react";
import { useFetchCategoriesAndBrands } from "../hooks/useFetchCategoriesAndBrands";
import { useUploadProduct } from "../hooks/useUploadProduct";
import { motion } from "framer-motion";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const UploadProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const { data, error: fetchError } = useFetchCategoriesAndBrands();
  const {
    mutate: uploadProduct,
    isLoading,
    isError,
    error,
  } = useUploadProduct();

  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);

    for (let i = 0; i < images.length; i++) {
      formData.append("productImage", images[i]);
    }

    uploadProduct(formData, {
      onSuccess: () => {
        toast.success("Product uploaded successfully!");
        setName("");
        setBrand("");
        setCategory("");
        setDescription("");
        setPrice("");
        setImages([]);
      },
      onError: () => {
        toast.error("Error uploading product. Please try again.");
      },
    });
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaUpload className="text-blue-500" /> Upload Product
      </motion.h1>

      {fetchError && (
        <motion.div
          className="text-red-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {fetchError.message}
        </motion.div>
      )}
      {isError && (
        <motion.div
          className="text-red-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error.message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              {data?.categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a brand</option>
              {data?.brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-gray-700">Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTrashAlt />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading} // Disable button while submitting
        >
          {isLoading ? "Uploading..." : "Upload Product"}
        </motion.button>
      </form>
    </div>
  );
};

export default UploadProduct;
