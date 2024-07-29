import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        const productData = response.data.product;
        setProduct(productData);
        setProductName(productData.name);
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

    fetchProduct();
  }, [id]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("brandName", brandName);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("sellingPrice", sellingPrice);

    for (let i = 0; i < productImages.length; i++) {
      formData.append("existingImages", productImages[i]);
    }

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
      toast.success("Product updated successfully!");
      navigate(`/products-list`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Brand:</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Price:</label>
          <input
            type="number"
            value={price}
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
