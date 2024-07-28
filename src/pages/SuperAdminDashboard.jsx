import React from "react";

const SuperAdminDashboard = () => {
  console.log(localStorage.getItem("role"));
  console.log(localStorage.getItem("token"));
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4">Super Admin Dashboard</h1>
      <p className="text-lg">
        Welcome, Super Admin! Here you can manage all aspects of the system,
        including user roles and system settings.
      </p>
      {/* Add more super admin-specific features here */}
    </div>
  );
};

export default SuperAdminDashboard;
