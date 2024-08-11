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


import CreateBrand from "./components/CreateBrand";
import UsersList from "./components/UsersList";

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
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />

       
       
       
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              roles={["admin"]}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
