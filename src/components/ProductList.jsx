// src/components/ProductList.js
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useProducts } from "../hooks/useProducts";

const ProductList = () => {
  const { products, isLoading, isError, deleteProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct._id);
      setSelectedProduct(null);
      setShowDeleteModal(false);
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {product.productImage.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Product"
                        className="w-16 h-16 object-cover"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex space-x-2">
                    <Link to={`/product/edit/${product._id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => openDeleteModal(product)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
