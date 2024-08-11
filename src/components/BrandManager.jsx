import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash, FaSave, FaTimes, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useCreateBrand } from "../hooks/useCreateBrand";
import { useBrandsManager } from "../hooks/useBrandsManager";
import { useQueryClient } from "@tanstack/react-query";

const BrandManager = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingBrandName, setEditingBrandName] = useState("");
  const [editingBrandImage, setEditingBrandImage] = useState(null);
  const [currentBrandImage, setCurrentBrandImage] = useState(null);

  const queryClient = useQueryClient();

  const { data: categories = [], isLoading: categoriesLoading } =
    useFetchCategories();
  const { mutate: createBrand, isLoading: creating } = useCreateBrand();
  const {
    brands,
    fetchError,
    isLoading: brandsLoading,
    mutateUpdateBrand,
    mutateDeleteBrand,
  } = useBrandsManager();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (image) {
      formData.append("brandImage", image);
    }

    createBrand(formData, {
      onSuccess: () => {
        toast.success("Brand created successfully");
        queryClient.invalidateQueries("brands"); // Invalidate and refetch brands
        setName("");
        setCategory("");
        setImage(null);
        setImagePreview(null);
      },
      onError: () => {
        toast.error("Error creating brand");
      },
    });
  };

  const handleEditBrand = () => {
    if (!editingBrandName) return;

    const formData = new FormData();
    formData.append("name", editingBrandName);
    if (editingBrandImage) {
      formData.append("brandImage", editingBrandImage);
    }

    mutateUpdateBrand(
      { id: editingBrandId, formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("brands");
          setEditingBrandId(null);
          setEditingBrandName("");
          setEditingBrandImage(null);
          setCurrentBrandImage(null);
          toast.success("Brand updated successfully");
        },
        onError: () => {
          toast.error("Error updating brand");
        },
      }
    );
  };

  const handleDeleteBrand = (brandId) => {
    mutateDeleteBrand(brandId, {
      onSuccess: () => {
        queryClient.invalidateQueries("brands");
        toast.success("Brand deleted successfully");
      },
      onError: () => {
        toast.error("Error deleting brand");
      },
    });
  };

  const handleEditingImageChange = (e) => {
    const file = e.target.files[0];
    setEditingBrandImage(file);
    setCurrentBrandImage(URL.createObjectURL(file));
  };

  if (categoriesLoading || brandsLoading) return <p>Loading...</p>;
  if (fetchError) return <p>Error fetching brands: {fetchError.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Brand</h2>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mb-6">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Brand Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Brand Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Brand Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={creating}
            className={`mt-4 py-2 px-4 rounded-md text-white ${
              creating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } transition-colors`}
          >
            {creating ? "Creating..." : "Create Brand"}
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Manage Brands</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <motion.li
            key={brand._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            {editingBrandId === brand._id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editingBrandName}
                  onChange={(e) => setEditingBrandName(e.target.value)}
                  placeholder="Brand Name"
                  className="border border-gray-300 p-2 rounded w-full mb-3"
                />
                <div className="flex justify-center mb-3">
                  {currentBrandImage ? (
                    <img
                      src={currentBrandImage}
                      alt="Current brand"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : brand.image ? (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaImage className="text-gray-500 text-2xl" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  onChange={handleEditingImageChange}
                  className="mb-3"
                  accept="image/*"
                />
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEditBrand}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center transition-colors duration-300"
                  >
                    <FaSave className="mr-2" /> Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingBrandId(null);
                      setEditingBrandName("");
                      setEditingBrandImage(null);
                      setCurrentBrandImage(null);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center transition-colors duration-300"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-24 h-24 object-cover rounded-full mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <FaImage className="text-gray-500 text-3xl" />
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-2">{brand.name}</h3>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingBrandId(brand._id);
                      setEditingBrandName(brand.name);
                      setCurrentBrandImage(brand.image);
                    }}
                    className="bg-blue-500 text-white px-3 py-2 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteBrand(brand._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default BrandManager;
