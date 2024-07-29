import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const productData = response.data.product;
        setProduct(productData);
        setProductName(productData.productName);
        setBrandName(productData.brandName);
        setCategory(productData.category);
        setDescription(productData.description);
        setPrice(productData.price);
        setSellingPrice(productData.sellingPrice);
        setProductImages(productData.productImage);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategoriesAndBrands = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/categories/get"),
          axios.get("http://localhost:5000/api/brands"),
        ]);
        setCategories(categoriesResponse.data);
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error("Error fetching categories or brands:", error);
      }
    };

    fetchProduct();
    fetchCategoriesAndBrands();
  }, [id]);

  const handleImageChange = (event) => {
    setNewImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("brandName", brandName);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("sellingPrice", sellingPrice);
    for (let i = 0; i < newImages.length; i++) {
      formData.append("newImages", newImages[i]);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/products`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand:
          </label>
          <select
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Selling Price:
          </label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Existing Images:
          </label>
          <div className="flex space-x-2 mt-2">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product"
                className="w-24 h-24 object-cover border border-gray-200 rounded"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Images:
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
