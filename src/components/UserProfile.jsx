import  { useState, useEffect } from "react";
import { useUserProfile, useUpdateUserProfile } from "../hooks/useUser";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import {
  FaUserCircle,
  FaFileUpload,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";

const UserProfile = () => {
  const { data, error, isLoading } = useUserProfile();
  const mutation = useUpdateUserProfile();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    profilePic: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username || "",
        email: data.email || "",
        mobile: data.mobile || "",
        profilePic: data.profilePic || "",
        password: "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const updatedFormData = new FormData();
    updatedFormData.append("username", formData.username);
    updatedFormData.append("email", formData.email);
    updatedFormData.append("mobile", formData.mobile);
    updatedFormData.append("password", formData.password);
    if (file) updatedFormData.append("profilePic", file);

    try {
      await mutation.mutateAsync(updatedFormData);
      queryClient.invalidateQueries(["userProfile"]);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) {
    toast.error("Error fetching data");
    return <div className="text-center py-4">Error fetching data</div>;
  }

  return (
    <motion.div
      className="p-4 sm:p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        User Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {formData.profilePic ? (
            <motion.img
              src={formData.profilePic}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border border-gray-300 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-7xl mb-4" />
          )}
          <label className="block text-gray-700 mb-2 flex items-center cursor-pointer">
            <FaFileUpload className="mr-2 text-gray-600" />
            <span>Choose Profile Picture</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-2">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="absolute top-2 right-3 text-blue-500 hover:text-blue-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <motion.button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
        >
          {isUpdating ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            "Update Profile"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UserProfile;
