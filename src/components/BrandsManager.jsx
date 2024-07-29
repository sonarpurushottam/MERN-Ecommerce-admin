import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BrandsManager = () => {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingBrandName, setEditingBrandName] = useState("");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/brands/get");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands");
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/brands/create",
        { name: newBrand },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBrands([...brands, response.data]);
      setNewBrand("");
      toast.success("Brand added successfully");
    } catch (error) {
      console.error("Error adding brand:", error);
      toast.error("Failed to add brand");
    }
  };

  const handleEditBrand = async () => {
    if (!editingBrandName) return;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/brands/${editingBrandId}`,
        { name: editingBrandName },
        {
          headers: {
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
      <h2 className="text-xl font-bold mb-4">Manage Brands</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="New brand name"
          className="border border-gray-300 p-2 w-full"
        />
        <button
          onClick={handleAddBrand}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Brand
        </button>
      </div>
      <ul className="list-disc pl-5">
        {brands.map((brand) => (
          <li key={brand._id} className="mb-2">
            {editingBrandId === brand._id ? (
              <div>
                <input
                  type="text"
                  value={editingBrandName}
                  onChange={(e) => setEditingBrandName(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
                <button
                  onClick={handleEditBrand}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingBrandId(null);
                    setEditingBrandName("");
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>{brand.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditingBrandId(brand._id);
                      setEditingBrandName(brand.name);
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBrand(brand._id)}
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

export default BrandsManager;
