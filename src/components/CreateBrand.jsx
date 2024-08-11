import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFetchCategories } from "../hooks/useFetchCategories";
import { useCreateBrand } from "../hooks/useCreateBrand";


const CreateBrand = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: categories = [], isLoading: categoriesLoading } =
    useFetchCategories();
  const { mutate: createBrand, isLoading: creating } = useCreateBrand();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (image) {
      formData.append("brandImage", image);
    }

    createBrand(formData, {
      onSuccess: () => {
        toast.success("Brand created successfully");
        // navigate("/brands");
      },
      onError: () => {
        toast.error("Error creating brand");
      },
    });
  };

  if (categoriesLoading) return <p>Loading categories...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Brand</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Brand Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Brand Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Brand Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={creating}
          className={`mt-4 py-2 px-4 rounded-md text-white ${
            creating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
        >
          {creating ? "Creating..." : "Create Brand"}
        </button>
      </form>
      
    </div>
  );
};

export default CreateBrand;
