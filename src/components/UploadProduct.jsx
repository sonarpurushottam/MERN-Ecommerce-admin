import { useState } from "react";
import { useFetchCategoriesAndBrands } from "../hooks/useFetchCategoriesAndBrands";
import { useUploadProduct } from "../hooks/useUploadProduct";
import { motion } from "framer-motion";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Input, Select, SelectItem, Avatar, Textarea } from "@nextui-org/react";

const UploadProduct = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const { data, error: fetchError } = useFetchCategoriesAndBrands();
  const {
    mutate: uploadProduct,
    isLoading,
    isError,
    error,
  } = useUploadProduct();

  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);

    for (let i = 0; i < images.length; i++) {
      formData.append("productImage", images[i]);
    }

    uploadProduct(formData, {
      onSuccess: () => {
        toast.success("Product uploaded successfully!");
        setName("");
        setBrand("");
        setCategory("");
        setDescription("");
        setPrice("");
        setImages([]);
      },
      onError: () => {
        toast.error("Error uploading product. Please try again.");
      },
    });
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaUpload className="text-blue-500" /> Add Product
      </motion.h1>

      {fetchError && (
        <motion.div
          className="text-red-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {fetchError.message}
        </motion.div>
      )}
      {isError && (
        <motion.div
          className="text-red-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error.message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4 ">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            label="Product Name"
            variant="bordered"
            className="max-w-xs"
            required
          />

          <div className="mb-4 pt-4 ">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              placeholder="Select a category"
              labelPlacement="outside"
              className="max-w-xs"
              variant="bordered"
            >
              {data?.categories.map((category) => (
                <SelectItem
                  key={category._id}
                  value={category._id}
                  textValue={category.name}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={category.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={category.image}
                    />
                    <div className="flex flex-col">
                      <span className="text-small">{category.name}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="mb-4">
              <Select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                label="Brand"
                placeholder="Select a Brand"
                labelPlacement="outside"
                className="max-w-xs"
                variant="bordered"
              >
                {data?.brands.map((brand) => (
                  <SelectItem
                    key={brand._id}
                    value={brand._id}
                    textValue={brand.name}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        alt={brand.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={brand.image}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{brand.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="mb-4 col-span-2">
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="max-w-xs"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              variant="bordered"
            />
          </div>

          <Input
            type="number"
            label="Price"
            placeholder="0.00"
            labelPlacement="outside"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="max-w-xs"
            variant="bordered"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">₹</span>
              </div>
            }
          />

          <div className="mb-4 col-span-2">
            <Input
              type="file"
              onChange={handleImageChange}
              multiple
              label="Add Product Images"
              variant="bordered"
              className="max-w-xs"
              required
            />
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTrashAlt />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading} // Disable button while submitting
        >
          {isLoading ? "Uploading..." : "Upload Product"}
        </motion.button>
      </form>
    </div>
  );
};

export default UploadProduct;
