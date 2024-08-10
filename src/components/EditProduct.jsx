// src/components/EditProduct.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { useProducts } from "../hooks/useProducts";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct, isUpdating } = useProducts();

  // Fetch the product data using useQuery with object syntax
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // Fetch only if id is available
  });

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setBrandName(product.brandName || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setSellingPrice(product.sellingPrice || "");
      setProductImages(product.productImage || []);
    }
  }, [product]);

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const existingFiles = newImages.map((file) => file.name);

    const duplicates = newFiles.filter((file) =>
      existingFiles.includes(file.name)
    );

    if (duplicates.length > 0) {
      toast.error("Some images are duplicates and won't be added.");
    } else {
      const uniqueFiles = newFiles.filter(
        (file) => !existingFiles.includes(file.name)
      );
      setNewImages([...newImages, ...uniqueFiles]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("brandName", brandName);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("sellingPrice", sellingPrice);

    // Add existing images
    productImages.forEach((image) => {
      formData.append("existingImages", image);
    });

    // Add new images
    newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    // Debugging: Log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    updateProduct(
      { id, formData },
      {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          navigate("/products-list");
        },
        onError: () => {
          toast.error("Failed to update product.");
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Name:</label>
          <input
            type="text"
            value={productName || ""}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Brand:</label>
          <input
            type="text"
            value={brandName || ""}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Category:</label>
          <input
            type="text"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Description:</label>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Price:</label>
          <input
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Existing Images:</label>
          <div className="flex space-x-2">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product"
                className="w-16 h-16 object-cover"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">New Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex space-x-2 mt-2">
            {Array.from(newImages).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="New Product"
                className="w-16 h-16 object-cover"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
        {isUpdating && (
          <div className="flex justify-center mt-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
