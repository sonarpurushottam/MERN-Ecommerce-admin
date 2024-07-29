import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/categories/get"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories/create",
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategory("");
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategoryName) return;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/categories/${editingCategoryId}`,
        { name: editingCategoryName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(
        categories.map((category) =>
          category._id === editingCategoryId ? response.data : category
        )
      );
      setEditingCategoryId(null);
      setEditingCategoryName("");
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="border border-gray-300 p-2 w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Category
        </button>
      </div>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category._id} className="mb-2">
            {editingCategoryId === category._id ? (
              <div>
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
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
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>{category.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditingCategoryId(category._id);
                      setEditingCategoryName(category.name);
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
