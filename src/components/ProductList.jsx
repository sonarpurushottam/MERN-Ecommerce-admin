import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useProducts } from "../hooks/useProducts";

const ProductList = () => {
  // Fetching products, loading state, error state, and deleteProduct function from the custom hook
  const { products, isLoading, isError, deleteProduct } = useProducts();

  // State to manage the selected product for deletion
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Function to handle product deletion
  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct._id);
      setSelectedProduct(null);
      setShowDeleteModal(false);
    }
  };

  // Function to open the delete modal with the selected product
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Sort products by creation date, newest first
  const sortedProducts = products?.length
    ? [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  // Show loading spinner while products are being fetched
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  // Display error message if there is an error in fetching products
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">
          Error loading products.
        </p>
      </div>
    );

  // Display message if no products are available
  if (!products || products.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg font-semibold">
          No products available.
        </p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-gray-800 mb-8 text-center"
        >
          Product List
        </motion.h1>
        <div className="overflow-x-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="hover:bg-gray-50 transition duration-300 ease-in-out"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      ₹{product.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {/* Safely access the first image if it exists */}
                      {product.productImage?.[0] ? (
                        <motion.img
                          src={product.productImage[0]}
                          alt="Product"
                          className="w-24 h-24 object-cover rounded-lg shadow-md"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                      ) : (
                        <span>No Image Available</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                        <Link to={`/product/edit/${product._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                          >
                            Edit
                          </motion.button>
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                          onClick={() => openDeleteModal(product)}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Delete confirmation modal */}
        {showDeleteModal && (
          <ConfirmDeleteModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
