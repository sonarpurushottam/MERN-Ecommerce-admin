import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CategoryAndBrandManager = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [editingCategoryImage, setEditingCategoryImage] = useState(null);

  const [newBrand, setNewBrand] = useState("");
  const [newBrandImage, setNewBrandImage] = useState(null);
  const [selectedCategoryForBrand, setSelectedCategoryForBrand] = useState("");
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingBrandName, setEditingBrandName] = useState("");
  const [editingBrandImage, setEditingBrandImage] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
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

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/brands/get");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;

    const formData = new FormData();
    formData.append("name", newCategory);
    if (selectedCategoryImage) {
      formData.append("categoryImage", selectedCategoryImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategory("");
      setSelectedCategoryImage(null);
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  const handleEditCategory = async () => {
    if (!editingCategoryName) return;

    const formData = new FormData();
    formData.append("name", editingCategoryName);
    if (editingCategoryImage) {
      formData.append("categoryImage", editingCategoryImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/categories/${editingCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
      setEditingCategoryImage(null);
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
      setBrands(brands.filter((brand) => brand.categoryId !== categoryId));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand || !selectedCategoryForBrand) return;

    const formData = new FormData();
    formData.append("name", newBrand);
    formData.append("categoryId", selectedCategoryForBrand);
    if (newBrandImage) {
      formData.append("brandImage", newBrandImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/brands/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBrands([...brands, response.data]);
      setNewBrand("");
      setNewBrandImage(null);
      setSelectedCategoryForBrand("");
      toast.success("Brand added successfully");
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Failed to add brand");
    }
  };

  const handleEditBrand = async () => {
    if (!editingBrandName) return;

    const formData = new FormData();
    formData.append("name", editingBrandName);
    if (editingBrandImage) {
      formData.append("brandImage", editingBrandImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/brands/${editingBrandId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBrands(
        brands.map((brand) =>
          brand._id === editingBrandId ? response.data : brand
        )
      );
      setEditingBrandId(null);
      setEditingBrandName("");
      setEditingBrandImage(null);
      toast.success("Brand updated successfully");
    } catch (error) {
      console.error("Error updating brand:", error);
      toast.error("Failed to update brand");
    }
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      await axios.delete(`http://localhost:5000/api/brands/${brandId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBrands(brands.filter((brand) => brand._id !== brandId));
      toast.success("Brand deleted successfully");
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast.error("Failed to delete brand");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories and Brands</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add Category</h3>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          className="border border-gray-300 p-2 w-full"
        />
        <input
          type="file"
          onChange={(e) => setSelectedCategoryImage(e.target.files[0])}
          className="mt-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Category
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add Brand</h3>
        <input
          type="text"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="New brand name"
          className="border border-gray-300 p-2 w-full"
        />
        <select
          value={selectedCategoryForBrand}
          onChange={(e) => setSelectedCategoryForBrand(e.target.value)}
          className="border border-gray-300 p-2 w-full mt-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setNewBrandImage(e.target.files[0])}
          className="mt-2"
        />
        <button
          onClick={handleAddBrand}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Brand
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Manage Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="border p-2 mb-2 flex items-center">
            {editingCategoryId === category._id ? (
              <>
                <input
                  type="text"
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  className="border border-gray-300 p-2 mr-2"
                />
                <input
                  type="file"
                  onChange={(e) => setEditingCategoryImage(e.target.files[0])}
                  className="mr-2"
                />
                <button
                  onClick={handleEditCategory}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCategoryId(null)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <button
                  onClick={() => {
                    setEditingCategoryId(category._id);
                    setEditingCategoryName(category.name);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Manage Brands</h3>
      <ul>
        {brands.map((brand) => (
          <li key={brand._id} className="border p-2 mb-2 flex items-center">
            {editingBrandId === brand._id ? (
              <>
                <input
                  type="text"
                  value={editingBrandName}
                  onChange={(e) => setEditingBrandName(e.target.value)}
                  className="border border-gray-300 p-2 mr-2"
                />
                <input
                  type="file"
                  onChange={(e) => setEditingBrandImage(e.target.files[0])}
                  className="mr-2"
                />
                <button
                  onClick={handleEditBrand}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingBrandId(null)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{brand.name}</span>
                <button
                  onClick={() => {
                    setEditingBrandId(brand._id);
                    setEditingBrandName(brand.name);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBrand(brand._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryAndBrandManager;
