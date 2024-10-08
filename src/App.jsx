import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";
import UploadProduct from "./components/UploadProduct";
import CategoriesManager from "./components/CategoriesManager";
import AdminSidebar from "./components/AdminSidebar";
import UsersList from "./components/UsersList";
import BrandManager from "./components/BrandManager";
import "./App.css";
import UserProfile from "./components/UserProfile";
import AdminOrders from "./components/AdminOrders";
import OrderSummaryDashboard from "./components/OrderSummaryDashboard";

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex">
      {/* Render AdminSidebar only if not on the login page */}
      {!isLoginPage && <AdminSidebar />}
      <main className={`flex-1 ${!isLoginPage ? "ml-64" : ""} p-4`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/upload-product" element={<UploadProduct />} />
          <Route path="/categories" element={<CategoriesManager />} />
          <Route path="/brands" element={<BrandManager />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />

          <Route path="/edit-profile" element={<UserProfile />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route
            path="/admin/orders-summary"
            element={<OrderSummaryDashboard />}
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute element={<AdminDashboard />} roles={["admin"]} />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
