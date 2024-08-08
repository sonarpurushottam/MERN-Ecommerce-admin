// src/components/admin/OrderAdminPanel.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderAdminPanel = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <nav>
        <ul className="list-disc list-inside">
          <li>
            <Link to="/admin/orders" className="text-indigo-600 hover:text-indigo-900 text-lg">Order List</Link>
          </li>
          {/* Add more admin links here if needed */}
        </ul>
      </nav>
    </div>
  );
};

export default OrderAdminPanel;
