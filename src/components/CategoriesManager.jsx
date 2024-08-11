import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { useCategoriesManager } from "../hooks/useCategoriesManager";

const CategoriesManager = () => {
  const {
    categories,
    fetchError,
    isLoading,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesManager();

  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
  const [selectedCategoryImagePreview, setSelectedCategoryImagePreview] =
    useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingCategoryImage, setEditingCategoryImage] = useState(null);
  const [editingCategoryImagePreview, setEditingCategoryImagePreview] =
    useState(null);

  const handleAddCategory = () => {
    if (!newCategory) return;

    const formData = new FormData();
    formData.append("name", newCategory);
    if (selectedCategoryImage) {
      formData.append("categoryImage", selectedCategoryImage);
    }

    addCategory(formData);
    setNewCategory("");
    setSelectedCategoryImage(null);
    setSelectedCategoryImagePreview(null);
  };

  const handleEditCategory = () => {
    if (!editingCategoryName) return;

    const formData = new FormData();
    formData.append("name", editingCategoryName);
    if (editingCategoryImage) {
      formData.append("categoryImage", editingCategoryImage);
    }

    updateCategory({ id: editingCategoryId, formData });
    setEditingCategoryId(null);
    setEditingCategoryName("");
    setEditingCategoryImage(null);
    setEditingCategoryImagePreview(null);
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
  };

  const handleImageChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isEditing) {
        setEditingCategoryImage(file);
        setEditingCategoryImagePreview(URL.createObjectURL(file));
      } else {
        setSelectedCategoryImage(file);
        setSelectedCategoryImagePreview(URL.createObjectURL(file));
      }
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (fetchError)
    return (
      <div className="text-center py-4 text-red-500">
        Error loading categories
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Manage Categories
      </h2>

      <motion.div
        className="mb-6 p-4 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="border border-gray-300 p-2 w-full rounded-md text-sm md:text-base"
        />
        <input
          type="file"
          onChange={(e) => handleImageChange(e)}
          className="mt-2"
        />
        {selectedCategoryImagePreview && (
          <img
            src={selectedCategoryImagePreview}
            alt="Selected"
            className="w-24 h-24 object-cover rounded mt-2 mx-auto"
          />
        )}
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center mt-2"
        >
          <FaPlus className="mr-2" /> Add Category
        </button>
      </motion.div>

      <motion.ul
        className="list-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.li
            key={category._id}
            className="mb-4 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {editingCategoryId === category._id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md text-sm md:text-base"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, true)}
                  className="mt-2"
                />
                {editingCategoryImagePreview || category.image ? (
                  <img
                    src={editingCategoryImagePreview || category.image}
                    alt="Editing Selected"
                    className="w-24 h-24 object-cover rounded mt-2 mx-auto"
                  />
                ) : null}
                <div className="flex flex-col md:flex-row mt-2 space-y-2 md:space-y-0 md:space-x-2">
                  <button
                    onClick={handleEditCategory}
                    className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <IoMdCheckmark className="mr-2" /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategoryId(null);
                      setEditingCategoryName("");
                      setEditingCategoryImage(null);
                      setEditingCategoryImagePreview(null);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 object-cover rounded-md mb-4 md:mb-0 md:mr-4"
                  />
                )}
                <span className="flex-grow text-lg font-medium text-center md:text-left">
                  {category.name}
                </span>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
                  <button
                    onClick={() => {
                      setEditingCategoryId(category._id);
                      setEditingCategoryName(category.name);
                      setEditingCategoryImage(null);
                      setEditingCategoryImagePreview(null);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md flex items-center"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default CategoriesManager;
