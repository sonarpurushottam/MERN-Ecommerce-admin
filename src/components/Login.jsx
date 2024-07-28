import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate email or mobile number
  const validateEmailOrMobile = (input) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input) || /^[0-9]{10}$/.test(input);

  // Validate password
  const validatePassword = (password) => password.length >= 6;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmailOrMobile(emailOrMobile)) {
      toast.error("Invalid email address or mobile number");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      // POST request to login endpoint
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { emailOrMobile, password },
        { withCredentials: true }
      );

      // Assuming response contains user info including role and token
      const { token, role } = response.data;

      // Check if the role is admin or superadmin
      if (role === "admin" || role === "superadmin") {
        // Store token and role in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Redirect based on role
        if (role === "superadmin") {
          navigate("/super-admin");
        } else if (role === "admin") {
          navigate("/admin-dashboard");
        }

        toast.success("Login successful!");
      } else {
        // If role is neither admin nor superadmin, show unauthorized message
        toast.error("Unauthorized");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
    console.log(localStorage.getItem("role")); // Should log the role if stored correctly
    console.log(localStorage.getItem("token"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email or Mobile
            </label>
            <input
              type="text"
              placeholder="Enter your email or mobile number"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full transition duration-150 ease-in-out ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
