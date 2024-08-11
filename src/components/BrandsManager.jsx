import { useState } from "react";
import { useBrandsManager } from "../hooks/useBrandsManager";

const BrandsManager = () => {
  const {
    brands,
    fetchError,
    isLoading,
    mutateUpdateBrand,
    mutateDeleteBrand,
  } = useBrandsManager();
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editingBrandName, setEditingBrandName] = useState("");
  const [editingBrandImage, setEditingBrandImage] = useState(null);
  const [currentBrandImage, setCurrentBrandImage] = useState(null);

  const handleEditBrand = () => {
    if (!editingBrandName) return;

    const formData = new FormData();
    formData.append("name", editingBrandName);
    if (editingBrandImage) {
      formData.append("brandImage", editingBrandImage);
    }

    mutateUpdateBrand({ id: editingBrandId, formData });
    setEditingBrandId(null);
    setEditingBrandName("");
    setEditingBrandImage(null);
    setCurrentBrandImage(null);
  };

  const handleDeleteBrand = (brandId) => {
    mutateDeleteBrand(brandId);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditingBrandImage(file);
    setCurrentBrandImage(URL.createObjectURL(file));
  };

  if (isLoading) return <p>Loading...</p>;
  if (fetchError) return <p>Error fetching brands: {fetchError.message}</p>;

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
                      setEditingBrandImage(null);
                      setCurrentBrandImage(brand.image);
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
