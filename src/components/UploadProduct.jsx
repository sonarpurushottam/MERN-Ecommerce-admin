import { useState, useEffect } from "react";
import axios from "axios";
import CategoriesManager from "./CategoriesManager";
import CreateBrand from "./CreateBrand";

const UploadProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const [categoryResponse, brandResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/categories/get"),
          axios.get("http://localhost:5000/api/brands/get"),
        ]);
        setCategories(categoryResponse.data);
        setBrands(brandResponse.data);
      } catch (err) {
        console.error("Error fetching categories or brands:", err);
        setError("Failed to load categories or brands");
      }
    };
    fetchCategoriesAndBrands();
  }, []);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("countInStock", countInStock);

    for (let i = 0; i < images.length; i++) {
      formData.append("productImage", images[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Product uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading product:", error);
      setError("Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload Product</h1>
      <CategoriesManager
        onCategoriesChange={(updatedCategories) =>
          setCategories(updatedCategories)
        }
      />
      <CreateBrand />
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
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
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="">Select a brand</option>
            {brands.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Count In Stock</label>
          <input
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border border-gray-300 p-2 w-full"
          />
          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {Array.from(images).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-32 h-32 object-cover border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
      {/* <BrandsManager
        onBrandsChange={(updatedBrands) => setBrands(updatedBrands)}
      /> */}
    </div>
  );
};

export default UploadProduct;
