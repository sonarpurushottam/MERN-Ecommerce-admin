import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaBox, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="md:hidden flex items-center p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 z-50 w-64`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav className="mt-6">
            <ul>
              <li className="mb-4">
                <Link
                  to="/"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                  onClick={toggleSidebar}
                >
                  <FaHome className="mr-3" />
                  Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/users-list"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                  onClick={toggleSidebar}
                >
                  <FaUser className="mr-3" />
                  Users
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/products"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                  onClick={toggleSidebar}
                >
                  <FaBox className="mr-3" />
                  Products
                </Link>
              </li>
              {/* Add more menu items here */}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
