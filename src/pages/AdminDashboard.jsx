import ProductList from "../components/ProductList";

import CreateBrand from "../components/CreateBrand";

const AdminDashboard = () => {
  console.log(localStorage.getItem("role")); // Should log the role if stored correctly
  console.log(localStorage.getItem("token"));

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ProductList />
      <CreateBrand />
    </div>
  );
};

export default AdminDashboard;
