
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              roles={["admin", "superadmin"]}
            />
          }
        />
        <Route
          path="/superadmin-dashboard"
          element={
            <PrivateRoute
              element={<SuperAdminDashboard />}
              roles={["superadmin"]}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
