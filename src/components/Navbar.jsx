import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">My App</Link>
        <div>
          <Link to="/register" className="text-white mr-4">Register</Link>
          <Link to="/login" className="text-white">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
