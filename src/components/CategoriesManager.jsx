import React, { useState } from "react";
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
  const [selectedCategoryImagePreview, setSelectedCategoryImagePreview] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingCategoryImage, setEditingCategoryImage] = useState(null);
  const [editingCategoryImagePreview, setEditingCategoryImagePreview] = useState(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error loading categories</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="border border-gray-300 p-2 w-full"
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
            className="w-16 h-16 object-cover rounded mt-2"
          />
        )}
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Category
        </button>
      </div>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category._id} className="mb-2 flex items-center">
            {editingCategoryId === category._id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, true)}
                  className="mt-2"
                />
                {editingCategoryImagePreview && (
                  <img
                    src={editingCategoryImagePreview}
                    alt="Editing Selected"
                    className="w-16 h-16 object-cover rounded mt-2"
                  />
                )}
                <button
                  onClick={handleEditCategory}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingCategoryId(null);
                    setEditingCategoryName("");
                    setEditingCategoryImage(null);
                    setEditingCategoryImagePreview(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center">
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                  )}
                  <span>{category.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditingCategoryId(category._id);
                      setEditingCategoryName(category.name);
                      setEditingCategoryImage(null); // reset image
                      setEditingCategoryImagePreview(null); // reset preview
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesManager;
