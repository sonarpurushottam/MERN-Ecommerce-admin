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

import NextNavbar from "./components/header/NextNavbar";
import OrderAdminPanel from "./components/admin/OrderAdminPanel";
import OrderList from "./components/admin/OrderList";
import OrderDetails from "./components/admin/OrderDetails";

import CreateBrand from "./components/CreateBrand";

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
    <>
      {!isLoginPage && <NextNavbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products-list" element={<ProductList />} />
        <Route path="/upload-product" element={<UploadProduct />} />
        <Route path="/categories" element={<CategoriesManager />} />
        <Route path="/brands" element={<CreateBrand />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={<OrderAdminPanel />}
              roles={["admin", "superadmin"]}
            />
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute
              element={<OrderList />}
              roles={["admin", "superadmin"]}
            />
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <PrivateRoute
              element={<OrderDetails />}
              roles={["admin", "superadmin"]}
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              roles={["admin", "superadmin"]}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
