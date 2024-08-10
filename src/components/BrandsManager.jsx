import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BrandsManager = () => {
  const [brands, setBrands] = useState([]);
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingBrandName, setEditingBrandName] = useState("");
  const [editingBrandImage, setEditingBrandImage] = useState(null);
  const [currentBrandImage, setCurrentBrandImage] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/brands/get"
        );
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands");
      }
    };

    fetchBrands();
  }, []);

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
      setCurrentBrandImage(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditingBrandImage(file);
    setCurrentBrandImage(URL.createObjectURL(file)); // Display the selected image preview
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Brands</h2>

      <ul className="list-disc pl-5">
        {brands.map((brand) => (
          <li key={brand._id} className="mb-2 flex items-center">
            {editingBrandId === brand._id ? (
              <div className="w-full">
                <input
                  type="text"
                  value={editingBrandName}
                  onChange={(e) => setEditingBrandName(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
                {currentBrandImage ? (
                  <img
                    src={currentBrandImage}
                    alt="Current brand"
                    className="w-16 h-16 object-cover rounded mt-2"
                  />
                ) : brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-16 h-16 object-cover rounded mt-2"
                  />
                ) : null}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-2"
                  accept="image/*"
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
                    setEditingBrandImage(null);
                    setCurrentBrandImage(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {brand.image && (
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                  )}
                  <span>{brand.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setEditingBrandId(brand._id);
                      setEditingBrandName(brand.name);
                      setEditingBrandImage(null); // reset image
                      setCurrentBrandImage(brand.image); // Show current image
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
