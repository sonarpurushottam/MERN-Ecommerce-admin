import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/logout"; // Adjust the path as necessary
import UploadProduct from "../components/UploadProduct";
import EditProduct from "../components/EditProduct";
import ProductList from "../components/ProductList";

const AdminDashboard = () => {
  console.log(localStorage.getItem("role")); // Should log the role if stored correctly
  console.log(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };
  // Check if items are stored correctly
  // Should log the token if stored correctly

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Other dashboard content */}
      <UploadProduct />
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Logout
      </button>
      <ProductList />
      <EditProduct />
    </div>
  );
};

export default AdminDashboard;
