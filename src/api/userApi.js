import axiosInstance from "./axiosInstance";

// Fetch user profile
export const fetchUserProfile = async () => {
  const { data } = await axiosInstance.get("/users/profile");
  return data;
};

// Update user profile
export const updateUserProfile = async (formData) => {
  const { data } = await axiosInstance.put("/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Logout user
export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found.");
  }

  try {
    // Make the POST request to the logout endpoint
    const response = await axiosInstance.post(
      "/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response || error);
    throw error;
  }
};
